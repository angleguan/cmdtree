---
layout: post
title: "Linux内核bug导致的CPU功耗异常"
date: 2017-10-30 09:16:38 +0800
category: linux
---


CPU功耗和温度都升高严重，在确认没有什么后台进程占用CPU后确定是内核版本太新，应该是bug，在bugzilla看到相似情况[196973 &ndash; Fan still blows up after fixing the regression - Lenovo x1c Generation 5 (2017)](https://bugzilla.kernel.org/show_bug.cgi?id=196973)，

```
Lv Zheng 2017-09-18 01:47:47 UTC
Created attachment 258449 [details]
acpidump of x1c gen5 (2017)

I am so sorry I have not been fully tested,I think that the issue still exists on my pc because I found following patch in the fedora src.rpm package:

$ rpm2cpio kernel-4.12.11-300.fc26.src.rpm| cpio -div
$ cat patch-4.12.11| grep '@@.*acpi_ec_ecdt_probe' -A31
@@ -1812,24 +1812,6 @@ int __init acpi_ec_ecdt_probe(void)
 }
 
 #ifdef CONFIG_PM_SLEEP
-static int acpi_ec_suspend_noirq(struct device *dev)
-{
-    struct acpi_ec *ec =
-        acpi_driver_data(to_acpi_device(dev));
-
-    acpi_ec_enter_noirq(ec);
-    return 0;
-}
-
-static int acpi_ec_resume_noirq(struct device *dev)
-{
-    struct acpi_ec *ec =
-        acpi_driver_data(to_acpi_device(dev));
-
-    acpi_ec_leave_noirq(ec);
-    return 0;
-}
-
 static int acpi_ec_suspend(struct device *dev)
 {
     struct acpi_ec *ec =
@@ -1851,7 +1833,6 @@ static int acpi_ec_resume(struct device *dev)
 #endif
 
 static const struct dev_pm_ops acpi_ec_pm = {
-    SET_NOIRQ_SYSTEM_SLEEP_PM_OPS(acpi_ec_suspend_noirq, acpi_ec_resume_noirq)
     SET_SYSTEM_SLEEP_PM_OPS(acpi_ec_suspend, acpi_ec_resume)
 };

After receiving your e-mail, I tested the 4.13.1 kernel and reproduced the problem.
I copied the output record:

[fengzi@x1c ~]% while [ 1 ] ; do sensors | awk '{if ($0 ~ /Package/) temp = $4; else if ($0 ~ /fan/) {fan = $2; unit = $3}} END{print temp"  "fan" "unit}'; sleep 2; done
+48.0°C  0 RPM
+47.0°C  0 RPM
+67.0°C  0 RPM
ERROR: Can't get value of subfeature temp1_input: I/O error
+60.0°C  65535 RPM
+61.0°C  65535 RPM
+49.0°C  65535 RPM
+48.0°C  65535 RPM
+47.0°C  0 RPM
ERROR: Can't get value of subfeature temp1_input: I/O error
+76.0°C  3492 RPM
+49.0°C  4538 RPM
+47.0°C  5208 RPM
+46.0°C  5836 RPM
+45.0°C  6423 RPM
+44.0°C  7025 RPM
+45.0°C  6976 RPM
+46.0°C  6960 RPM
+45.0°C  6960 RPM
+47.0°C  6960 RPM
+43.0°C  6960 RPM
+44.0°C  6960 RPM
^C%                                                                                                                                                                                 [fengzi@x1c ~]% sensors
coretemp-isa-0000
Adapter: ISA adapter
Package id 0:  +45.0°C  (high = +100.0°C, crit = +100.0°C)
Core 0:        +45.0°C  (high = +100.0°C, crit = +100.0°C)
Core 1:        +42.0°C  (high = +100.0°C, crit = +100.0°C)

pch_skylake-virtual-0
Adapter: Virtual device
temp1:        +43.5°C  

acpitz-virtual-0
Adapter: Virtual device
temp1:        +48.0°C  (crit = +128.0°C)

iwlwifi-virtual-0
Adapter: Virtual device
temp1:        +41.0°C  

thinkpad-isa-0000
Adapter: ISA adapter
fan1:        6960 RPM

[fengzi@x1c ~]% uname -r
4.13.1-303.fc27.x86_64

Do I need to provide additional information?

Thanks
an
```


只好回退到4.11.8-300.fc26，功耗温度正常。

最后，感觉fedora太过激进了，还是保守点好。