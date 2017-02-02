
<%@ Page Language="C#" %>
<%@ Import Namespace="Microsoft.SharePoint" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<form runat="server">
    <SharePoint:FormDigest ID="FormDigest1" runat="server"></SharePoint:FormDigest>
</form>
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />

<script type="text/javascript" src="https://ajax.aspnetcdn.com/ajax/4.0/1/MicrosoftAjax.js"></script>
<script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
<script type="text/javascript" src="/_layouts/15/sp.js"></script>
<script type="text/javascript" src="/_layouts/15/sp.ui.controls.js"></script>
<script type="text/javascript" src="/_layouts/15/sp.taxonomy.js"></script>
<script type="text/javascript" src="/PTAssets/js/jquery-3.1.0.min.js"></script>
<script type="text/javascript" src="/PTAssets/js/fetch.js"></script>
<script type="text/javascript" src="/PTAssets/js/es6-promise.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.8/js/materialize.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>

<!-- Basic Page Needs
 –––––––––––––––––––––––––––––––––––––––––––––––––– -->
<meta charset="utf-8">
<title>Rebel with a course</title>
<meta name="description" content="">
<meta name="author" content="">
<!-- Mobile Specific Metas
  –––––––––––––––––––––––––––––––––––––––––––––––––– -->
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.8/css/materialize.min.css">
<link rel="stylesheet" href="https://cdn.datatables.net/1.10.13/css/jquery.dataTables.min.css" />
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">


<!-- <script type="text/javascript" src="/ptassets/apps/Flat-UI-Pro-1.3.2/dist/js/vendor/bootstrap.min.js"></script> -->
<script type="text/javascript" src="/ptassets/apps/common/knockout-3.3.0.js"></script>
<script type="text/javascript" src="/ptassets/apps/jquery.bootgrid-1.3.1/jquery.bootgrid.min.js"></script>
<script type="text/javascript" src="/ptassets/apps/jquery.bootgrid-1.3.1/jquery.bootgrid.fa.min.js"></script>
<!-- <script type="text/javascript" src="/ptassets/apps/Flat-UI-Pro-1.3.2/dist/js/flat-ui-pro.min.js"></script> -->
<script type="text/javascript" src="../ptassets/apps/coursestart/bundle.js"></script>
<link rel="stylesheet" type="text/css" href="/ptassets/apps/jquery.bootgrid-1.3.1/jquery.bootgrid.min.css" />
<link rel="stylesheet" type="text/css" href="../ptassets/apps/coursestart/startpage.css" />

 <nav>
    <div class="nav-wrapper">
        <a href="#" class="brand-logo" data-bind="text:'Avvik - ' + companyName()">Rebel with a course</a>
        <a href="#" data-activates="mobile-nav" class="button-collapse"><i class="material-icons">menu</i></a>
        <ul class="right hide-on-med-and-down">
            <li id="videoKnapp" ><a href="#videoWrap">Videoes</a></li>
            <li id="swayKnapp"><a href="#swayWrap">Sways</a></li>
            <li id="officeKnapp"><a href="#officeWrap">Documents</a></li>
        </ul>
        <ul class="side-nav" id="mobile-nav">
           <li id="videoKnapp" ><a href="#videoWrap">Videoes</a></li>
            <li id="swayKnapp"><a href="#swayWrap">Sways</a></li>
            <li id="officeKnapp"><a href="#officeWrap">Documents</a></li>
        </ul>
    </div>
</nav>

<div class="startApp">
	<a href="/sites/course/courseapp/Start.aspx" button class="btn btn-hg btn-primary">Start the course</a>
</div>

<div class="">
	<div id="koCourse" class="">
		<div id="videoWrap">
			<div id="Video">
				<h5>Videoes</h5>
				<table class="table table-bordered .u-full-width" id="koVideo">	
					<thead>
						<tr>
							<th data-column-id="Title" data-formatter="commands">Title</th>
							<th data-column-id="CourseCategory">Course category</th>
						</tr>
					</thead>
					<tbody data-bind="foreach: videos" class="grid-activity"> 				
						<tr class="table table-bordered">
							<td style="display:inline-grid !important;"><a class="" data-bind="attr { href: URL.Url}"><span data-bind="text:  URL ? URL.Description + '|' + URL.Url : 'Ingen url' "></span></a></td>
							<td style="display:inline-grid !important;"><span data-bind="text: CourseCategory"></span></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div id="swayWrap">
			<div id="Sway">
			<div class="oppigjen"><a href="#contentRow" button class="btn btn-info">Back to the top</a></div>
				<h5>Sways</h5>
				<table class="table table-bordered .u-full-width" id="koSway">	
					<thead>
						<tr>
							<th  data-column-id="Title" data-formatter="commands">Title</th>
							<th data-column-id="CourseCategory">Course category</th>
						</tr>
					</thead>
					<tbody data-bind="foreach: sways" class="grid-activity"> 				
						<tr class="">
							<td class="akademietColumn"><a class="" data-bind="attr { href: URL.Url }"><span data-bind="text:  URL ? URL.Description + '|' + URL.Url : 'Ingen url' "></span></a></td>
							<td style="display:inline-grid !important;"><span class="" data-bind="text: CourseCategory"></span></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div id="officeWrap">
			<div id="Office">
			<div class="oppigjen"><a href="#contentRow" button class="btn btn-info">Back to the top</a></div>
				<h5>Documents</h5>
				<table class="table table-bordered .u-full-width" id="koOffice">	
					<thead>
						<tr>
							<th data-column-id="Title" data-formatter="commands">Title</th>
							<th data-column-id="CourseCategory">Course category</th>
						</tr>
					</thead>
					<tbody data-bind="foreach: docs" class="grid-activity"> 				
						<tr class="">
							<td class="akademietColumn"><a class="" data-bind="attr { href: URL.Url }"><span data-bind="text:  URL ? URL.Description + '|' + URL.Url : 'Ingen url' "></span></a></td>
							<td class="akademietColumn"><span class="" data-bind="text: CourseCategory"></span></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
<script>
     $(".button-collapse").sideNav();
</script>
	