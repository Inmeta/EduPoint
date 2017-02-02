import pnp from "sp-pnp-js";
import { Web } from "sp-pnp-js/lib/sharepoint/rest/webs";
import * as $ from "jquery";

declare function unescape(s: string): string;
declare function escape(s: string): string;

export class UploadFile {
    upload(dataUri: any, fileName: string, web: Web, folderRelativeUrl: string) {
        var deferred = $.Deferred();
        var blob = this.dataURItoBlob(dataUri, web, fileName, folderRelativeUrl);
        web.getFolderByServerRelativeUrl(folderRelativeUrl).files.add(fileName, blob, true).then(result => {
             console.log("File uploaded");
             deferred.resolve(result);
        }).catch(error => {
            console.log(error.responseText);
            deferred.reject(error.responseText);
        });
        return deferred.promise();
    }

    dataURItoBlob(dataURI: string, web: Web, fileName: string, folderRelativeUrl: string) {
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0) {
            byteString = atob(dataURI.split(',')[1]);
        }
        else {
            byteString = unescape(dataURI.split(',')[1]);
        }

        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return  new Blob([ia], { type: mimeString });
    }
}
export class UploadFileItem{
    fileName:string;
    fileDataUrl:string;
}