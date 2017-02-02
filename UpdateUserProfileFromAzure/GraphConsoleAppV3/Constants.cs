namespace GraphConsoleAppV3
{
    internal class AppModeConstants
    {
        //https://login.microsoftonline.com/bahrda.onmicrosoft.com/FederationMetadata/2007-06/FederationMetadata.xml


        public const string ClientId = "";
        public const string ClientSecret = "";
        public const string TenantName = "xxx.onmicrosoft.com";
        public const string TenantId = "";
        public const string AuthString = GlobalConstants.AuthString + TenantName;




    }

    internal class UserModeConstants
    {
        public const string TenantId = AppModeConstants.TenantId;
        public const string ClientId = "66133929-66a4-4edc-aaee-13b04b03207d";
        public const string AuthString = GlobalConstants.AuthString + "common/";
    }

    internal class GlobalConstants
    {
        public const string AuthString = "https://login.microsoftonline.com/";
        public const string ResourceUrl = "https://graph.windows.net";
        public const string GraphServiceObjectId = "00000002-0000-0000-c000-000000000000";
    }
}
