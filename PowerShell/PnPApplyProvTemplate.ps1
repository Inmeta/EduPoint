
$pw = convertto-securestring -AsPlainText -Force -String 'w8ing4dooM'
$cred = new-object -typename System.Management.Automation.PSCredential -argumentlist 'kh@edupoint.no',$pw
$siteCollUrl = "https://aspc2017.sharepoint.com/sites/course"
Connect-SPOnline -Url $siteCollUrl -Credentials @cred

Apply-SPOProvisioningTemplate -Path C:\code\EduPoint\PowerShell\Templates\aspc2017Course.xml -Handlers Fields
