import * as ko from "knockout";
import * as moment from "moment";
import * as $ from "jquery";
import pnp from "sp-pnp-js";
import { Web } from "sp-pnp-js/lib/sharepoint/rest/webs";
import * as _ from "underscore";



var viewModel = {
	    videos: ko.observableArray(),
	    docs: ko.observableArray(),
	    sways: ko.observableArray()
	};
function start() {
    pnp.sp.web.lists.getByTitle("Step").items.select("Title,CourseCategory,URL,ContentTypeId,ContentType/Id,ContentType/Name").expand("ContentType").get().then(function (items) {
        _.each(items, function (item:any, index) {
            if (item.ContentType.Name == "VideoStep") {
                viewModel.videos.push(item);
            }
        });
        
        ko.applyBindings(viewModel, document.getElementById("koCourse"));
    });
}
start();