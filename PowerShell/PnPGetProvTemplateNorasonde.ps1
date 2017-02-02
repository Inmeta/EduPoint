
$pw = convertto-securestring -AsPlainText -Force -String 'KjetilPenis123'
$cred = new-object -typename System.Management.Automation.PSCredential -argumentlist 'ptadmin@norasondegruppen.no',$pw
$siteCollUrl = "https://norasondegruppenas.sharepoint.com/sites/akademiet"
Connect-SPOnline -Url $siteCollUrl -Credentials @cred


Get-SPOProvisioningTemplate -Out C:\code\EduPoint\PowerShell\Templates\Norasonde.xml -Handlers Fields,ContentTypes,Lists 