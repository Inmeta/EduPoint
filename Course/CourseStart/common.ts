import * as moment from "moment";
import * as _ from "underscore";
import * as ko from "knockout";
import { Web } from "sp-pnp-js/lib/sharepoint/rest/webs";
import * as sptypes from "sp-pnp-js/lib/sharepoint/rest";
import * as $ from "jquery";

export class DevItem {
    public id:number;
    public guid:string;
    public author: Person;
    public title = ko.observable();
    public observedBy = ko.observable();
    public description = ko.observable();
    public suggestions = ko.observable();
    public completedMeasures = ko.observable();
    public medication = ko.observable();
    public gasStation = ko.observable();
    public handler: Person;
    public editor: Person;
    public created = ko.observable();
    public modified = ko.observable();
    public url = ko.observable();
    public startDate = ko.observable();
    public closeDate = ko.observable();
    public category1 = ko.observable("");
    public category2 = ko.observable("");
    public category3 = ko.observable("");
    public status = ko.observable();
    public reasonType = ko.observable();
    public consequenceType = ko.observable();
    public reasonDesc = ko.observable();
    public evaluation = ko.observable();
    public consequenceDesc = ko.observable();
    public receivers = ko.observableArray();
    public tasks = ko.observableArray();
    public notifyReceivers = ko.observable(false);
    public files: SPFile[]
}

export class UploadFileItem {
    fileName: string;
    fileDataUrl: string;
    comment= ko.observable();
}

export class SPFile {
    encodedAbsUrl: string;
    linkFilename: string;
    fileName: string;
    fileDataUrl: string;
    comment: string;
    
}
export class Person {
    title = ko.observable();
    email = ko.observable();
    picUrl = ko.observable();
    id = ko.observable();
}


export function MapSPItemToDevClass(spItem) {

    let deviation = new DevItem();
    deviation.id = spItem.ID;
    deviation.guid = spItem.GUID;
    deviation.title = spItem.Title;

    deviation.author = new Person();
    deviation.author.title = spItem.Author.Title;
    deviation.author.email = spItem.Author.EMail;

    deviation.editor = new Person();
    deviation.editor.title = spItem.Editor.Title;
    deviation.editor.email = spItem.Editor.EMail;

    deviation.handler = new Person();
    deviation.handler.title = spItem.Behandler !== undefined ? spItem.Behandler.Title : "";
    deviation.handler.email = spItem.Behandler !== undefined ? spItem.Behandler.EMail : "";

    deviation.created(moment(spItem.Created).format("DD.MM.YYYY"));
    deviation.modified(moment(spItem.Modified).format("DD.MM.YYYY"));
    deviation.closeDate(spItem.Lukkefrist !== null ? moment(spItem.Lukkefrist).format("DD.MM.YYYY") : "");
    deviation.startDate(spItem.FristForOppstart !== null ? moment(spItem.FristForOppstart).format("DD.MM.YYYY") : "");

    deviation.description = spItem.AvvikBeskrivelse;
    deviation.suggestions = spItem.ForslagTilTiltak;
    deviation.completedMeasures = spItem.UtforteTiltak;

    deviation.category1(spItem.Kategori1);
    deviation.category2(spItem.Kategori2);
    deviation.category3(spItem.Kategori3);

    deviation.reasonDesc(spItem.BeskrivelseAvArsak);
    deviation.reasonType(spItem.Arsakstype);
    deviation.consequenceType(spItem.Konsekvenstype);
    deviation.consequenceDesc(spItem.BeskrivelseAvKonsekvens);
    deviation.evaluation(spItem.Evaluering);
    deviation.gasStation(spItem.Bensinstasjon);
    deviation.medication(spItem.Legemidler);

    deviation.status(spItem.Avviksstatus);
    deviation.url(_spPageContextInfo.webAbsoluteUrl + "/ptassets/avvik.aspx?ID=" + spItem.ID);

    deviation.files = new Array<SPFile>();

    //deviation.receivers = new Array<Person>();

    _.each(spItem.Mottakere, function (receiver: any, index) {
        let person = new Person()
        person.title = receiver.Title;
        person.id = receiver.Id;
        deviation.receivers.push(person);
    });

    return deviation;
}
export function MapSPItemToTaskClass(spItem) {

    let task = new Task();
    task.id = spItem.ID;
    task.title = spItem.Title;

    task.author = new Person();
    task.author.title = spItem.Author.Title;
    task.author.email = spItem.Author.EMail;

    task.responsible = new Person();
    task.responsible.title = spItem.AssignedTo == undefined ? "":spItem.AssignedTo.Title;
    task.responsible.email = spItem.AssignedTo == undefined ? "":spItem.AssignedTo.Email;

    task.editor = new Person();
    task.editor.title = spItem.Editor.Title;
    task.editor.email = spItem.Editor.EMail;

    task.created(moment(spItem.Created).format("DD.MM.YYYY"));
    task.modified(moment(spItem.Modified).format("DD.MM.YYYY"));
    if(spItem.DueDate!==undefined){
        task.dueDate(moment(spItem.DueDate).format("DD.MM.YYYY"));
    }

    task.taskType(spItem.Tiltakstype)
    task.status(spItem.Status);

    return task;
}
export function MapResToAttachments(result) {
    var files = new Array<SPFile>();
    
    _.each(result,function(attachment:any,index:number){
        let spFile = new SPFile();
        spFile.encodedAbsUrl = attachment.EncodedAbsUrl;
        spFile.linkFilename = attachment.LinkFilename;
        spFile.fileName = attachment.LinkFilename;
        spFile.comment = attachment.Vedleggskommentar;
        files.push(spFile);
    });
    
    return files; 
}

/*********************************************************************** */
//tasks
export class Task {
    constructor(){
        this.responsible = new Person()
        this.responsible.id(0);
    }
    title = ko.observable();
    description = ko.observable();
    responsible: Person;
    author: Person;
    editor: Person;
    dueDate = ko.observable();
    status = ko.observable();
    id = ko.observable();
    deviationId:number;
    deviationGuid:string;
    modified = ko.observable();
    created = ko.observable();
    taskType=ko.observable();
    files= ko.observableArray();// SPFile[]
}

export function MapResToTask(result) {
    var task = new Task();
    
    task.id(result.Id);
    task.title(result.Title);
    task.description(result.Body);
    
    if (result.DueDate != undefined)
        task.dueDate(moment(result.DueDate).format("DD.MM.YYYY"));
    if (result.AssignedTo != undefined) {
        task.responsible.id(result.AssignedTo.Id);
        task.responsible.title(result.AssignedTo.Title);
    }
    task.status(result.Status);
    task.taskType(result.Tiltakstype);
    
    return task; 
}

export function CreateTask(props: any, web: Web, listName:string) {
    var deferred = $.Deferred();
   
    web.lists.getByTitle(listName).items.add(props).then(function(result:sptypes.ItemAddResult) {
        console.log("Task created");
        deferred.resolve(result);
    }).catch(error => {
        console.log(error.responseText);
        deferred.reject(error.responseText);
    });

    return deferred.promise();
}

export function UpdateTask(id:any,props: any, web: Web, listName:string) {
    var deferred = $.Deferred();
    web.lists.getByTitle(listName).items.getById(id).update(props).then(function(result) {
            console.log("Task created");
            deferred.resolve(result);
    }).catch(error => {
        console.log(error.responseText);
        deferred.reject(error.responseText);
    });

    return deferred.promise();
}

export function CreateListItem(webUrl:string,listName:string,itemProperties:JSON) 
{    
    return $.ajax({       
       url: webUrl + "/_api/web/lists/getbytitle('" + listName + "')/items",   
       type: "POST",   
       processData: false,  
       contentType: "application/json;odata=verbose",
       data: JSON.stringify(itemProperties),
       headers: {   
          "Accept": "application/json;odata=verbose",
          "X-RequestDigest": $("#__REQUESTDIGEST").val()
       }  
    });
}
export function UpdateListItem(itemId:number,webUrl:string,listName:string,itemProperties) 
{    
    return $.ajax({       
       url: webUrl + "/_api/web/lists/getbytitle('" + listName + "')/items("+itemId+")",   
       type: "POST",   
       processData: false,  
       contentType: "application/json;odata=verbose",
       data: JSON.stringify(itemProperties),
       headers: { 
          "Accept": "application/json;odata=verbose",
          "X-RequestDigest" : $("#__REQUESTDIGEST").val(),
          "X-HTTP-Method": "MERGE",
           "If-Match": "*"
       } 
       
    });
}
export function GetConfig(web:Web,listName:string,personId:number) 
{
    return web.lists.getByTitle(listName).items.select("Title,FirmaId,Avviksliste,Tiltaksliste,KvalitetsansvarligId,Firmakolonne").get();
}
export function SetLocalStorage(item){
    localStorage["Company"] = item.Title;
    localStorage["ListName"] = item.Avviksliste;
    localStorage["TaskListName"] = item.Tiltaksliste;
    
    let isQualityAdmin=false;
    _.each(item.KvalitetsansvarligId, function(item,index) {
        isQualityAdmin = (item == _spPageContextInfo.userId); 
        if(isQualityAdmin){
            localStorage["QualityManager"]=true;
        }
    });
    localStorage["CompanyId"] = item.FirmaId;
    localStorage["CompanyField"] = item.Firmakolonne;
}