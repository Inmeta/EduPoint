/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var ko = __webpack_require__(1);
	var sp_pnp_js_1 = __webpack_require__(4);
	var _ = __webpack_require__(49);
	var viewModel = {
	    videos: ko.observableArray(),
	    docs: ko.observableArray(),
	    sways: ko.observableArray()
	};
	function start() {
	    sp_pnp_js_1["default"].sp.web.lists.getByTitle("Step").items.select("Title,CourseCategory,URL,ContentTypeId,ContentType/Id,ContentType/Name").expand("ContentType").get().then(function (items) {
	        _.each(items, function (item, index) {
	            if (item.ContentType.Name == "VideoStep") {
	                viewModel.videos.push(item);
	            }
	        });
	        ko.applyBindings(viewModel, document.getElementById("koCourse"));
	    });
	}
	start();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {/*!
	 * Knockout JavaScript library v3.4.1
	 * (c) The Knockout.js team - http://knockoutjs.com/
	 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
	 */
	
	(function(){
	var DEBUG=true;
	(function(undefined){
	    // (0, eval)('this') is a robust way of getting a reference to the global object
	    // For details, see http://stackoverflow.com/questions/14119988/return-this-0-evalthis/14120023#14120023
	    var window = this || (0, eval)('this'),
	        document = window['document'],
	        navigator = window['navigator'],
	        jQueryInstance = window["jQuery"],
	        JSON = window["JSON"];
	(function(factory) {
	    // Support three module loading scenarios
	    if ("function" === 'function' && __webpack_require__(3)['amd']) {
	        // [1] AMD anonymous module
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (true) {
	        // [2] CommonJS/Node.js
	        factory(module['exports'] || exports);  // module.exports is for Node.js
	    } else {
	        // [3] No module loader (plain <script> tag) - put directly in global namespace
	        factory(window['ko'] = {});
	    }
	}(function(koExports, amdRequire){
	// Internally, all KO objects are attached to koExports (even the non-exported ones whose names will be minified by the closure compiler).
	// In the future, the following "ko" variable may be made distinct from "koExports" so that private objects are not externally reachable.
	var ko = typeof koExports !== 'undefined' ? koExports : {};
	// Google Closure Compiler helpers (used only to make the minified file smaller)
	ko.exportSymbol = function(koPath, object) {
	    var tokens = koPath.split(".");
	
	    // In the future, "ko" may become distinct from "koExports" (so that non-exported objects are not reachable)
	    // At that point, "target" would be set to: (typeof koExports !== "undefined" ? koExports : ko)
	    var target = ko;
	
	    for (var i = 0; i < tokens.length - 1; i++)
	        target = target[tokens[i]];
	    target[tokens[tokens.length - 1]] = object;
	};
	ko.exportProperty = function(owner, publicName, object) {
	    owner[publicName] = object;
	};
	ko.version = "3.4.1";
	
	ko.exportSymbol('version', ko.version);
	// For any options that may affect various areas of Knockout and aren't directly associated with data binding.
	ko.options = {
	    'deferUpdates': false,
	    'useOnlyNativeEvents': false
	};
	
	//ko.exportSymbol('options', ko.options);   // 'options' isn't minified
	ko.utils = (function () {
	    function objectForEach(obj, action) {
	        for (var prop in obj) {
	            if (obj.hasOwnProperty(prop)) {
	                action(prop, obj[prop]);
	            }
	        }
	    }
	
	    function extend(target, source) {
	        if (source) {
	            for(var prop in source) {
	                if(source.hasOwnProperty(prop)) {
	                    target[prop] = source[prop];
	                }
	            }
	        }
	        return target;
	    }
	
	    function setPrototypeOf(obj, proto) {
	        obj.__proto__ = proto;
	        return obj;
	    }
	
	    var canSetPrototype = ({ __proto__: [] } instanceof Array);
	    var canUseSymbols = !DEBUG && typeof Symbol === 'function';
	
	    // Represent the known event types in a compact way, then at runtime transform it into a hash with event name as key (for fast lookup)
	    var knownEvents = {}, knownEventTypesByEventName = {};
	    var keyEventTypeName = (navigator && /Firefox\/2/i.test(navigator.userAgent)) ? 'KeyboardEvent' : 'UIEvents';
	    knownEvents[keyEventTypeName] = ['keyup', 'keydown', 'keypress'];
	    knownEvents['MouseEvents'] = ['click', 'dblclick', 'mousedown', 'mouseup', 'mousemove', 'mouseover', 'mouseout', 'mouseenter', 'mouseleave'];
	    objectForEach(knownEvents, function(eventType, knownEventsForType) {
	        if (knownEventsForType.length) {
	            for (var i = 0, j = knownEventsForType.length; i < j; i++)
	                knownEventTypesByEventName[knownEventsForType[i]] = eventType;
	        }
	    });
	    var eventsThatMustBeRegisteredUsingAttachEvent = { 'propertychange': true }; // Workaround for an IE9 issue - https://github.com/SteveSanderson/knockout/issues/406
	
	    // Detect IE versions for bug workarounds (uses IE conditionals, not UA string, for robustness)
	    // Note that, since IE 10 does not support conditional comments, the following logic only detects IE < 10.
	    // Currently this is by design, since IE 10+ behaves correctly when treated as a standard browser.
	    // If there is a future need to detect specific versions of IE10+, we will amend this.
	    var ieVersion = document && (function() {
	        var version = 3, div = document.createElement('div'), iElems = div.getElementsByTagName('i');
	
	        // Keep constructing conditional HTML blocks until we hit one that resolves to an empty fragment
	        while (
	            div.innerHTML = '<!--[if gt IE ' + (++version) + ']><i></i><![endif]-->',
	            iElems[0]
	        ) {}
	        return version > 4 ? version : undefined;
	    }());
	    var isIe6 = ieVersion === 6,
	        isIe7 = ieVersion === 7;
	
	    function isClickOnCheckableElement(element, eventType) {
	        if ((ko.utils.tagNameLower(element) !== "input") || !element.type) return false;
	        if (eventType.toLowerCase() != "click") return false;
	        var inputType = element.type;
	        return (inputType == "checkbox") || (inputType == "radio");
	    }
	
	    // For details on the pattern for changing node classes
	    // see: https://github.com/knockout/knockout/issues/1597
	    var cssClassNameRegex = /\S+/g;
	
	    function toggleDomNodeCssClass(node, classNames, shouldHaveClass) {
	        var addOrRemoveFn;
	        if (classNames) {
	            if (typeof node.classList === 'object') {
	                addOrRemoveFn = node.classList[shouldHaveClass ? 'add' : 'remove'];
	                ko.utils.arrayForEach(classNames.match(cssClassNameRegex), function(className) {
	                    addOrRemoveFn.call(node.classList, className);
	                });
	            } else if (typeof node.className['baseVal'] === 'string') {
	                // SVG tag .classNames is an SVGAnimatedString instance
	                toggleObjectClassPropertyString(node.className, 'baseVal', classNames, shouldHaveClass);
	            } else {
	                // node.className ought to be a string.
	                toggleObjectClassPropertyString(node, 'className', classNames, shouldHaveClass);
	            }
	        }
	    }
	
	    function toggleObjectClassPropertyString(obj, prop, classNames, shouldHaveClass) {
	        // obj/prop is either a node/'className' or a SVGAnimatedString/'baseVal'.
	        var currentClassNames = obj[prop].match(cssClassNameRegex) || [];
	        ko.utils.arrayForEach(classNames.match(cssClassNameRegex), function(className) {
	            ko.utils.addOrRemoveItem(currentClassNames, className, shouldHaveClass);
	        });
	        obj[prop] = currentClassNames.join(" ");
	    }
	
	    return {
	        fieldsIncludedWithJsonPost: ['authenticity_token', /^__RequestVerificationToken(_.*)?$/],
	
	        arrayForEach: function (array, action) {
	            for (var i = 0, j = array.length; i < j; i++)
	                action(array[i], i);
	        },
	
	        arrayIndexOf: function (array, item) {
	            if (typeof Array.prototype.indexOf == "function")
	                return Array.prototype.indexOf.call(array, item);
	            for (var i = 0, j = array.length; i < j; i++)
	                if (array[i] === item)
	                    return i;
	            return -1;
	        },
	
	        arrayFirst: function (array, predicate, predicateOwner) {
	            for (var i = 0, j = array.length; i < j; i++)
	                if (predicate.call(predicateOwner, array[i], i))
	                    return array[i];
	            return null;
	        },
	
	        arrayRemoveItem: function (array, itemToRemove) {
	            var index = ko.utils.arrayIndexOf(array, itemToRemove);
	            if (index > 0) {
	                array.splice(index, 1);
	            }
	            else if (index === 0) {
	                array.shift();
	            }
	        },
	
	        arrayGetDistinctValues: function (array) {
	            array = array || [];
	            var result = [];
	            for (var i = 0, j = array.length; i < j; i++) {
	                if (ko.utils.arrayIndexOf(result, array[i]) < 0)
	                    result.push(array[i]);
	            }
	            return result;
	        },
	
	        arrayMap: function (array, mapping) {
	            array = array || [];
	            var result = [];
	            for (var i = 0, j = array.length; i < j; i++)
	                result.push(mapping(array[i], i));
	            return result;
	        },
	
	        arrayFilter: function (array, predicate) {
	            array = array || [];
	            var result = [];
	            for (var i = 0, j = array.length; i < j; i++)
	                if (predicate(array[i], i))
	                    result.push(array[i]);
	            return result;
	        },
	
	        arrayPushAll: function (array, valuesToPush) {
	            if (valuesToPush instanceof Array)
	                array.push.apply(array, valuesToPush);
	            else
	                for (var i = 0, j = valuesToPush.length; i < j; i++)
	                    array.push(valuesToPush[i]);
	            return array;
	        },
	
	        addOrRemoveItem: function(array, value, included) {
	            var existingEntryIndex = ko.utils.arrayIndexOf(ko.utils.peekObservable(array), value);
	            if (existingEntryIndex < 0) {
	                if (included)
	                    array.push(value);
	            } else {
	                if (!included)
	                    array.splice(existingEntryIndex, 1);
	            }
	        },
	
	        canSetPrototype: canSetPrototype,
	
	        extend: extend,
	
	        setPrototypeOf: setPrototypeOf,
	
	        setPrototypeOfOrExtend: canSetPrototype ? setPrototypeOf : extend,
	
	        objectForEach: objectForEach,
	
	        objectMap: function(source, mapping) {
	            if (!source)
	                return source;
	            var target = {};
	            for (var prop in source) {
	                if (source.hasOwnProperty(prop)) {
	                    target[prop] = mapping(source[prop], prop, source);
	                }
	            }
	            return target;
	        },
	
	        emptyDomNode: function (domNode) {
	            while (domNode.firstChild) {
	                ko.removeNode(domNode.firstChild);
	            }
	        },
	
	        moveCleanedNodesToContainerElement: function(nodes) {
	            // Ensure it's a real array, as we're about to reparent the nodes and
	            // we don't want the underlying collection to change while we're doing that.
	            var nodesArray = ko.utils.makeArray(nodes);
	            var templateDocument = (nodesArray[0] && nodesArray[0].ownerDocument) || document;
	
	            var container = templateDocument.createElement('div');
	            for (var i = 0, j = nodesArray.length; i < j; i++) {
	                container.appendChild(ko.cleanNode(nodesArray[i]));
	            }
	            return container;
	        },
	
	        cloneNodes: function (nodesArray, shouldCleanNodes) {
	            for (var i = 0, j = nodesArray.length, newNodesArray = []; i < j; i++) {
	                var clonedNode = nodesArray[i].cloneNode(true);
	                newNodesArray.push(shouldCleanNodes ? ko.cleanNode(clonedNode) : clonedNode);
	            }
	            return newNodesArray;
	        },
	
	        setDomNodeChildren: function (domNode, childNodes) {
	            ko.utils.emptyDomNode(domNode);
	            if (childNodes) {
	                for (var i = 0, j = childNodes.length; i < j; i++)
	                    domNode.appendChild(childNodes[i]);
	            }
	        },
	
	        replaceDomNodes: function (nodeToReplaceOrNodeArray, newNodesArray) {
	            var nodesToReplaceArray = nodeToReplaceOrNodeArray.nodeType ? [nodeToReplaceOrNodeArray] : nodeToReplaceOrNodeArray;
	            if (nodesToReplaceArray.length > 0) {
	                var insertionPoint = nodesToReplaceArray[0];
	                var parent = insertionPoint.parentNode;
	                for (var i = 0, j = newNodesArray.length; i < j; i++)
	                    parent.insertBefore(newNodesArray[i], insertionPoint);
	                for (var i = 0, j = nodesToReplaceArray.length; i < j; i++) {
	                    ko.removeNode(nodesToReplaceArray[i]);
	                }
	            }
	        },
	
	        fixUpContinuousNodeArray: function(continuousNodeArray, parentNode) {
	            // Before acting on a set of nodes that were previously outputted by a template function, we have to reconcile
	            // them against what is in the DOM right now. It may be that some of the nodes have already been removed, or that
	            // new nodes might have been inserted in the middle, for example by a binding. Also, there may previously have been
	            // leading comment nodes (created by rewritten string-based templates) that have since been removed during binding.
	            // So, this function translates the old "map" output array into its best guess of the set of current DOM nodes.
	            //
	            // Rules:
	            //   [A] Any leading nodes that have been removed should be ignored
	            //       These most likely correspond to memoization nodes that were already removed during binding
	            //       See https://github.com/knockout/knockout/pull/440
	            //   [B] Any trailing nodes that have been remove should be ignored
	            //       This prevents the code here from adding unrelated nodes to the array while processing rule [C]
	            //       See https://github.com/knockout/knockout/pull/1903
	            //   [C] We want to output a continuous series of nodes. So, ignore any nodes that have already been removed,
	            //       and include any nodes that have been inserted among the previous collection
	
	            if (continuousNodeArray.length) {
	                // The parent node can be a virtual element; so get the real parent node
	                parentNode = (parentNode.nodeType === 8 && parentNode.parentNode) || parentNode;
	
	                // Rule [A]
	                while (continuousNodeArray.length && continuousNodeArray[0].parentNode !== parentNode)
	                    continuousNodeArray.splice(0, 1);
	
	                // Rule [B]
	                while (continuousNodeArray.length > 1 && continuousNodeArray[continuousNodeArray.length - 1].parentNode !== parentNode)
	                    continuousNodeArray.length--;
	
	                // Rule [C]
	                if (continuousNodeArray.length > 1) {
	                    var current = continuousNodeArray[0], last = continuousNodeArray[continuousNodeArray.length - 1];
	                    // Replace with the actual new continuous node set
	                    continuousNodeArray.length = 0;
	                    while (current !== last) {
	                        continuousNodeArray.push(current);
	                        current = current.nextSibling;
	                    }
	                    continuousNodeArray.push(last);
	                }
	            }
	            return continuousNodeArray;
	        },
	
	        setOptionNodeSelectionState: function (optionNode, isSelected) {
	            // IE6 sometimes throws "unknown error" if you try to write to .selected directly, whereas Firefox struggles with setAttribute. Pick one based on browser.
	            if (ieVersion < 7)
	                optionNode.setAttribute("selected", isSelected);
	            else
	                optionNode.selected = isSelected;
	        },
	
	        stringTrim: function (string) {
	            return string === null || string === undefined ? '' :
	                string.trim ?
	                    string.trim() :
	                    string.toString().replace(/^[\s\xa0]+|[\s\xa0]+$/g, '');
	        },
	
	        stringStartsWith: function (string, startsWith) {
	            string = string || "";
	            if (startsWith.length > string.length)
	                return false;
	            return string.substring(0, startsWith.length) === startsWith;
	        },
	
	        domNodeIsContainedBy: function (node, containedByNode) {
	            if (node === containedByNode)
	                return true;
	            if (node.nodeType === 11)
	                return false; // Fixes issue #1162 - can't use node.contains for document fragments on IE8
	            if (containedByNode.contains)
	                return containedByNode.contains(node.nodeType === 3 ? node.parentNode : node);
	            if (containedByNode.compareDocumentPosition)
	                return (containedByNode.compareDocumentPosition(node) & 16) == 16;
	            while (node && node != containedByNode) {
	                node = node.parentNode;
	            }
	            return !!node;
	        },
	
	        domNodeIsAttachedToDocument: function (node) {
	            return ko.utils.domNodeIsContainedBy(node, node.ownerDocument.documentElement);
	        },
	
	        anyDomNodeIsAttachedToDocument: function(nodes) {
	            return !!ko.utils.arrayFirst(nodes, ko.utils.domNodeIsAttachedToDocument);
	        },
	
	        tagNameLower: function(element) {
	            // For HTML elements, tagName will always be upper case; for XHTML elements, it'll be lower case.
	            // Possible future optimization: If we know it's an element from an XHTML document (not HTML),
	            // we don't need to do the .toLowerCase() as it will always be lower case anyway.
	            return element && element.tagName && element.tagName.toLowerCase();
	        },
	
	        catchFunctionErrors: function (delegate) {
	            return ko['onError'] ? function () {
	                try {
	                    return delegate.apply(this, arguments);
	                } catch (e) {
	                    ko['onError'] && ko['onError'](e);
	                    throw e;
	                }
	            } : delegate;
	        },
	
	        setTimeout: function (handler, timeout) {
	            return setTimeout(ko.utils.catchFunctionErrors(handler), timeout);
	        },
	
	        deferError: function (error) {
	            setTimeout(function () {
	                ko['onError'] && ko['onError'](error);
	                throw error;
	            }, 0);
	        },
	
	        registerEventHandler: function (element, eventType, handler) {
	            var wrappedHandler = ko.utils.catchFunctionErrors(handler);
	
	            var mustUseAttachEvent = ieVersion && eventsThatMustBeRegisteredUsingAttachEvent[eventType];
	            if (!ko.options['useOnlyNativeEvents'] && !mustUseAttachEvent && jQueryInstance) {
	                jQueryInstance(element)['bind'](eventType, wrappedHandler);
	            } else if (!mustUseAttachEvent && typeof element.addEventListener == "function")
	                element.addEventListener(eventType, wrappedHandler, false);
	            else if (typeof element.attachEvent != "undefined") {
	                var attachEventHandler = function (event) { wrappedHandler.call(element, event); },
	                    attachEventName = "on" + eventType;
	                element.attachEvent(attachEventName, attachEventHandler);
	
	                // IE does not dispose attachEvent handlers automatically (unlike with addEventListener)
	                // so to avoid leaks, we have to remove them manually. See bug #856
	                ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
	                    element.detachEvent(attachEventName, attachEventHandler);
	                });
	            } else
	                throw new Error("Browser doesn't support addEventListener or attachEvent");
	        },
	
	        triggerEvent: function (element, eventType) {
	            if (!(element && element.nodeType))
	                throw new Error("element must be a DOM node when calling triggerEvent");
	
	            // For click events on checkboxes and radio buttons, jQuery toggles the element checked state *after* the
	            // event handler runs instead of *before*. (This was fixed in 1.9 for checkboxes but not for radio buttons.)
	            // IE doesn't change the checked state when you trigger the click event using "fireEvent".
	            // In both cases, we'll use the click method instead.
	            var useClickWorkaround = isClickOnCheckableElement(element, eventType);
	
	            if (!ko.options['useOnlyNativeEvents'] && jQueryInstance && !useClickWorkaround) {
	                jQueryInstance(element)['trigger'](eventType);
	            } else if (typeof document.createEvent == "function") {
	                if (typeof element.dispatchEvent == "function") {
	                    var eventCategory = knownEventTypesByEventName[eventType] || "HTMLEvents";
	                    var event = document.createEvent(eventCategory);
	                    event.initEvent(eventType, true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, element);
	                    element.dispatchEvent(event);
	                }
	                else
	                    throw new Error("The supplied element doesn't support dispatchEvent");
	            } else if (useClickWorkaround && element.click) {
	                element.click();
	            } else if (typeof element.fireEvent != "undefined") {
	                element.fireEvent("on" + eventType);
	            } else {
	                throw new Error("Browser doesn't support triggering events");
	            }
	        },
	
	        unwrapObservable: function (value) {
	            return ko.isObservable(value) ? value() : value;
	        },
	
	        peekObservable: function (value) {
	            return ko.isObservable(value) ? value.peek() : value;
	        },
	
	        toggleDomNodeCssClass: toggleDomNodeCssClass,
	
	        setTextContent: function(element, textContent) {
	            var value = ko.utils.unwrapObservable(textContent);
	            if ((value === null) || (value === undefined))
	                value = "";
	
	            // We need there to be exactly one child: a text node.
	            // If there are no children, more than one, or if it's not a text node,
	            // we'll clear everything and create a single text node.
	            var innerTextNode = ko.virtualElements.firstChild(element);
	            if (!innerTextNode || innerTextNode.nodeType != 3 || ko.virtualElements.nextSibling(innerTextNode)) {
	                ko.virtualElements.setDomNodeChildren(element, [element.ownerDocument.createTextNode(value)]);
	            } else {
	                innerTextNode.data = value;
	            }
	
	            ko.utils.forceRefresh(element);
	        },
	
	        setElementName: function(element, name) {
	            element.name = name;
	
	            // Workaround IE 6/7 issue
	            // - https://github.com/SteveSanderson/knockout/issues/197
	            // - http://www.matts411.com/post/setting_the_name_attribute_in_ie_dom/
	            if (ieVersion <= 7) {
	                try {
	                    element.mergeAttributes(document.createElement("<input name='" + element.name + "'/>"), false);
	                }
	                catch(e) {} // For IE9 with doc mode "IE9 Standards" and browser mode "IE9 Compatibility View"
	            }
	        },
	
	        forceRefresh: function(node) {
	            // Workaround for an IE9 rendering bug - https://github.com/SteveSanderson/knockout/issues/209
	            if (ieVersion >= 9) {
	                // For text nodes and comment nodes (most likely virtual elements), we will have to refresh the container
	                var elem = node.nodeType == 1 ? node : node.parentNode;
	                if (elem.style)
	                    elem.style.zoom = elem.style.zoom;
	            }
	        },
	
	        ensureSelectElementIsRenderedCorrectly: function(selectElement) {
	            // Workaround for IE9 rendering bug - it doesn't reliably display all the text in dynamically-added select boxes unless you force it to re-render by updating the width.
	            // (See https://github.com/SteveSanderson/knockout/issues/312, http://stackoverflow.com/questions/5908494/select-only-shows-first-char-of-selected-option)
	            // Also fixes IE7 and IE8 bug that causes selects to be zero width if enclosed by 'if' or 'with'. (See issue #839)
	            if (ieVersion) {
	                var originalWidth = selectElement.style.width;
	                selectElement.style.width = 0;
	                selectElement.style.width = originalWidth;
	            }
	        },
	
	        range: function (min, max) {
	            min = ko.utils.unwrapObservable(min);
	            max = ko.utils.unwrapObservable(max);
	            var result = [];
	            for (var i = min; i <= max; i++)
	                result.push(i);
	            return result;
	        },
	
	        makeArray: function(arrayLikeObject) {
	            var result = [];
	            for (var i = 0, j = arrayLikeObject.length; i < j; i++) {
	                result.push(arrayLikeObject[i]);
	            };
	            return result;
	        },
	
	        createSymbolOrString: function(identifier) {
	            return canUseSymbols ? Symbol(identifier) : identifier;
	        },
	
	        isIe6 : isIe6,
	        isIe7 : isIe7,
	        ieVersion : ieVersion,
	
	        getFormFields: function(form, fieldName) {
	            var fields = ko.utils.makeArray(form.getElementsByTagName("input")).concat(ko.utils.makeArray(form.getElementsByTagName("textarea")));
	            var isMatchingField = (typeof fieldName == 'string')
	                ? function(field) { return field.name === fieldName }
	                : function(field) { return fieldName.test(field.name) }; // Treat fieldName as regex or object containing predicate
	            var matches = [];
	            for (var i = fields.length - 1; i >= 0; i--) {
	                if (isMatchingField(fields[i]))
	                    matches.push(fields[i]);
	            };
	            return matches;
	        },
	
	        parseJson: function (jsonString) {
	            if (typeof jsonString == "string") {
	                jsonString = ko.utils.stringTrim(jsonString);
	                if (jsonString) {
	                    if (JSON && JSON.parse) // Use native parsing where available
	                        return JSON.parse(jsonString);
	                    return (new Function("return " + jsonString))(); // Fallback on less safe parsing for older browsers
	                }
	            }
	            return null;
	        },
	
	        stringifyJson: function (data, replacer, space) {   // replacer and space are optional
	            if (!JSON || !JSON.stringify)
	                throw new Error("Cannot find JSON.stringify(). Some browsers (e.g., IE < 8) don't support it natively, but you can overcome this by adding a script reference to json2.js, downloadable from http://www.json.org/json2.js");
	            return JSON.stringify(ko.utils.unwrapObservable(data), replacer, space);
	        },
	
	        postJson: function (urlOrForm, data, options) {
	            options = options || {};
	            var params = options['params'] || {};
	            var includeFields = options['includeFields'] || this.fieldsIncludedWithJsonPost;
	            var url = urlOrForm;
	
	            // If we were given a form, use its 'action' URL and pick out any requested field values
	            if((typeof urlOrForm == 'object') && (ko.utils.tagNameLower(urlOrForm) === "form")) {
	                var originalForm = urlOrForm;
	                url = originalForm.action;
	                for (var i = includeFields.length - 1; i >= 0; i--) {
	                    var fields = ko.utils.getFormFields(originalForm, includeFields[i]);
	                    for (var j = fields.length - 1; j >= 0; j--)
	                        params[fields[j].name] = fields[j].value;
	                }
	            }
	
	            data = ko.utils.unwrapObservable(data);
	            var form = document.createElement("form");
	            form.style.display = "none";
	            form.action = url;
	            form.method = "post";
	            for (var key in data) {
	                // Since 'data' this is a model object, we include all properties including those inherited from its prototype
	                var input = document.createElement("input");
	                input.type = "hidden";
	                input.name = key;
	                input.value = ko.utils.stringifyJson(ko.utils.unwrapObservable(data[key]));
	                form.appendChild(input);
	            }
	            objectForEach(params, function(key, value) {
	                var input = document.createElement("input");
	                input.type = "hidden";
	                input.name = key;
	                input.value = value;
	                form.appendChild(input);
	            });
	            document.body.appendChild(form);
	            options['submitter'] ? options['submitter'](form) : form.submit();
	            setTimeout(function () { form.parentNode.removeChild(form); }, 0);
	        }
	    }
	}());
	
	ko.exportSymbol('utils', ko.utils);
	ko.exportSymbol('utils.arrayForEach', ko.utils.arrayForEach);
	ko.exportSymbol('utils.arrayFirst', ko.utils.arrayFirst);
	ko.exportSymbol('utils.arrayFilter', ko.utils.arrayFilter);
	ko.exportSymbol('utils.arrayGetDistinctValues', ko.utils.arrayGetDistinctValues);
	ko.exportSymbol('utils.arrayIndexOf', ko.utils.arrayIndexOf);
	ko.exportSymbol('utils.arrayMap', ko.utils.arrayMap);
	ko.exportSymbol('utils.arrayPushAll', ko.utils.arrayPushAll);
	ko.exportSymbol('utils.arrayRemoveItem', ko.utils.arrayRemoveItem);
	ko.exportSymbol('utils.extend', ko.utils.extend);
	ko.exportSymbol('utils.fieldsIncludedWithJsonPost', ko.utils.fieldsIncludedWithJsonPost);
	ko.exportSymbol('utils.getFormFields', ko.utils.getFormFields);
	ko.exportSymbol('utils.peekObservable', ko.utils.peekObservable);
	ko.exportSymbol('utils.postJson', ko.utils.postJson);
	ko.exportSymbol('utils.parseJson', ko.utils.parseJson);
	ko.exportSymbol('utils.registerEventHandler', ko.utils.registerEventHandler);
	ko.exportSymbol('utils.stringifyJson', ko.utils.stringifyJson);
	ko.exportSymbol('utils.range', ko.utils.range);
	ko.exportSymbol('utils.toggleDomNodeCssClass', ko.utils.toggleDomNodeCssClass);
	ko.exportSymbol('utils.triggerEvent', ko.utils.triggerEvent);
	ko.exportSymbol('utils.unwrapObservable', ko.utils.unwrapObservable);
	ko.exportSymbol('utils.objectForEach', ko.utils.objectForEach);
	ko.exportSymbol('utils.addOrRemoveItem', ko.utils.addOrRemoveItem);
	ko.exportSymbol('utils.setTextContent', ko.utils.setTextContent);
	ko.exportSymbol('unwrap', ko.utils.unwrapObservable); // Convenient shorthand, because this is used so commonly
	
	if (!Function.prototype['bind']) {
	    // Function.prototype.bind is a standard part of ECMAScript 5th Edition (December 2009, http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-262.pdf)
	    // In case the browser doesn't implement it natively, provide a JavaScript implementation. This implementation is based on the one in prototype.js
	    Function.prototype['bind'] = function (object) {
	        var originalFunction = this;
	        if (arguments.length === 1) {
	            return function () {
	                return originalFunction.apply(object, arguments);
	            };
	        } else {
	            var partialArgs = Array.prototype.slice.call(arguments, 1);
	            return function () {
	                var args = partialArgs.slice(0);
	                args.push.apply(args, arguments);
	                return originalFunction.apply(object, args);
	            };
	        }
	    };
	}
	
	ko.utils.domData = new (function () {
	    var uniqueId = 0;
	    var dataStoreKeyExpandoPropertyName = "__ko__" + (new Date).getTime();
	    var dataStore = {};
	
	    function getAll(node, createIfNotFound) {
	        var dataStoreKey = node[dataStoreKeyExpandoPropertyName];
	        var hasExistingDataStore = dataStoreKey && (dataStoreKey !== "null") && dataStore[dataStoreKey];
	        if (!hasExistingDataStore) {
	            if (!createIfNotFound)
	                return undefined;
	            dataStoreKey = node[dataStoreKeyExpandoPropertyName] = "ko" + uniqueId++;
	            dataStore[dataStoreKey] = {};
	        }
	        return dataStore[dataStoreKey];
	    }
	
	    return {
	        get: function (node, key) {
	            var allDataForNode = getAll(node, false);
	            return allDataForNode === undefined ? undefined : allDataForNode[key];
	        },
	        set: function (node, key, value) {
	            if (value === undefined) {
	                // Make sure we don't actually create a new domData key if we are actually deleting a value
	                if (getAll(node, false) === undefined)
	                    return;
	            }
	            var allDataForNode = getAll(node, true);
	            allDataForNode[key] = value;
	        },
	        clear: function (node) {
	            var dataStoreKey = node[dataStoreKeyExpandoPropertyName];
	            if (dataStoreKey) {
	                delete dataStore[dataStoreKey];
	                node[dataStoreKeyExpandoPropertyName] = null;
	                return true; // Exposing "did clean" flag purely so specs can infer whether things have been cleaned up as intended
	            }
	            return false;
	        },
	
	        nextKey: function () {
	            return (uniqueId++) + dataStoreKeyExpandoPropertyName;
	        }
	    };
	})();
	
	ko.exportSymbol('utils.domData', ko.utils.domData);
	ko.exportSymbol('utils.domData.clear', ko.utils.domData.clear); // Exporting only so specs can clear up after themselves fully
	
	ko.utils.domNodeDisposal = new (function () {
	    var domDataKey = ko.utils.domData.nextKey();
	    var cleanableNodeTypes = { 1: true, 8: true, 9: true };       // Element, Comment, Document
	    var cleanableNodeTypesWithDescendants = { 1: true, 9: true }; // Element, Document
	
	    function getDisposeCallbacksCollection(node, createIfNotFound) {
	        var allDisposeCallbacks = ko.utils.domData.get(node, domDataKey);
	        if ((allDisposeCallbacks === undefined) && createIfNotFound) {
	            allDisposeCallbacks = [];
	            ko.utils.domData.set(node, domDataKey, allDisposeCallbacks);
	        }
	        return allDisposeCallbacks;
	    }
	    function destroyCallbacksCollection(node) {
	        ko.utils.domData.set(node, domDataKey, undefined);
	    }
	
	    function cleanSingleNode(node) {
	        // Run all the dispose callbacks
	        var callbacks = getDisposeCallbacksCollection(node, false);
	        if (callbacks) {
	            callbacks = callbacks.slice(0); // Clone, as the array may be modified during iteration (typically, callbacks will remove themselves)
	            for (var i = 0; i < callbacks.length; i++)
	                callbacks[i](node);
	        }
	
	        // Erase the DOM data
	        ko.utils.domData.clear(node);
	
	        // Perform cleanup needed by external libraries (currently only jQuery, but can be extended)
	        ko.utils.domNodeDisposal["cleanExternalData"](node);
	
	        // Clear any immediate-child comment nodes, as these wouldn't have been found by
	        // node.getElementsByTagName("*") in cleanNode() (comment nodes aren't elements)
	        if (cleanableNodeTypesWithDescendants[node.nodeType])
	            cleanImmediateCommentTypeChildren(node);
	    }
	
	    function cleanImmediateCommentTypeChildren(nodeWithChildren) {
	        var child, nextChild = nodeWithChildren.firstChild;
	        while (child = nextChild) {
	            nextChild = child.nextSibling;
	            if (child.nodeType === 8)
	                cleanSingleNode(child);
	        }
	    }
	
	    return {
	        addDisposeCallback : function(node, callback) {
	            if (typeof callback != "function")
	                throw new Error("Callback must be a function");
	            getDisposeCallbacksCollection(node, true).push(callback);
	        },
	
	        removeDisposeCallback : function(node, callback) {
	            var callbacksCollection = getDisposeCallbacksCollection(node, false);
	            if (callbacksCollection) {
	                ko.utils.arrayRemoveItem(callbacksCollection, callback);
	                if (callbacksCollection.length == 0)
	                    destroyCallbacksCollection(node);
	            }
	        },
	
	        cleanNode : function(node) {
	            // First clean this node, where applicable
	            if (cleanableNodeTypes[node.nodeType]) {
	                cleanSingleNode(node);
	
	                // ... then its descendants, where applicable
	                if (cleanableNodeTypesWithDescendants[node.nodeType]) {
	                    // Clone the descendants list in case it changes during iteration
	                    var descendants = [];
	                    ko.utils.arrayPushAll(descendants, node.getElementsByTagName("*"));
	                    for (var i = 0, j = descendants.length; i < j; i++)
	                        cleanSingleNode(descendants[i]);
	                }
	            }
	            return node;
	        },
	
	        removeNode : function(node) {
	            ko.cleanNode(node);
	            if (node.parentNode)
	                node.parentNode.removeChild(node);
	        },
	
	        "cleanExternalData" : function (node) {
	            // Special support for jQuery here because it's so commonly used.
	            // Many jQuery plugins (including jquery.tmpl) store data using jQuery's equivalent of domData
	            // so notify it to tear down any resources associated with the node & descendants here.
	            if (jQueryInstance && (typeof jQueryInstance['cleanData'] == "function"))
	                jQueryInstance['cleanData']([node]);
	        }
	    };
	})();
	ko.cleanNode = ko.utils.domNodeDisposal.cleanNode; // Shorthand name for convenience
	ko.removeNode = ko.utils.domNodeDisposal.removeNode; // Shorthand name for convenience
	ko.exportSymbol('cleanNode', ko.cleanNode);
	ko.exportSymbol('removeNode', ko.removeNode);
	ko.exportSymbol('utils.domNodeDisposal', ko.utils.domNodeDisposal);
	ko.exportSymbol('utils.domNodeDisposal.addDisposeCallback', ko.utils.domNodeDisposal.addDisposeCallback);
	ko.exportSymbol('utils.domNodeDisposal.removeDisposeCallback', ko.utils.domNodeDisposal.removeDisposeCallback);
	(function () {
	    var none = [0, "", ""],
	        table = [1, "<table>", "</table>"],
	        tbody = [2, "<table><tbody>", "</tbody></table>"],
	        tr = [3, "<table><tbody><tr>", "</tr></tbody></table>"],
	        select = [1, "<select multiple='multiple'>", "</select>"],
	        lookup = {
	            'thead': table,
	            'tbody': table,
	            'tfoot': table,
	            'tr': tbody,
	            'td': tr,
	            'th': tr,
	            'option': select,
	            'optgroup': select
	        },
	
	        // This is needed for old IE if you're *not* using either jQuery or innerShiv. Doesn't affect other cases.
	        mayRequireCreateElementHack = ko.utils.ieVersion <= 8;
	
	    function getWrap(tags) {
	        var m = tags.match(/^<([a-z]+)[ >]/);
	        return (m && lookup[m[1]]) || none;
	    }
	
	    function simpleHtmlParse(html, documentContext) {
	        documentContext || (documentContext = document);
	        var windowContext = documentContext['parentWindow'] || documentContext['defaultView'] || window;
	
	        // Based on jQuery's "clean" function, but only accounting for table-related elements.
	        // If you have referenced jQuery, this won't be used anyway - KO will use jQuery's "clean" function directly
	
	        // Note that there's still an issue in IE < 9 whereby it will discard comment nodes that are the first child of
	        // a descendant node. For example: "<div><!-- mycomment -->abc</div>" will get parsed as "<div>abc</div>"
	        // This won't affect anyone who has referenced jQuery, and there's always the workaround of inserting a dummy node
	        // (possibly a text node) in front of the comment. So, KO does not attempt to workaround this IE issue automatically at present.
	
	        // Trim whitespace, otherwise indexOf won't work as expected
	        var tags = ko.utils.stringTrim(html).toLowerCase(), div = documentContext.createElement("div"),
	            wrap = getWrap(tags),
	            depth = wrap[0];
	
	        // Go to html and back, then peel off extra wrappers
	        // Note that we always prefix with some dummy text, because otherwise, IE<9 will strip out leading comment nodes in descendants. Total madness.
	        var markup = "ignored<div>" + wrap[1] + html + wrap[2] + "</div>";
	        if (typeof windowContext['innerShiv'] == "function") {
	            // Note that innerShiv is deprecated in favour of html5shiv. We should consider adding
	            // support for html5shiv (except if no explicit support is needed, e.g., if html5shiv
	            // somehow shims the native APIs so it just works anyway)
	            div.appendChild(windowContext['innerShiv'](markup));
	        } else {
	            if (mayRequireCreateElementHack) {
	                // The document.createElement('my-element') trick to enable custom elements in IE6-8
	                // only works if we assign innerHTML on an element associated with that document.
	                documentContext.appendChild(div);
	            }
	
	            div.innerHTML = markup;
	
	            if (mayRequireCreateElementHack) {
	                div.parentNode.removeChild(div);
	            }
	        }
	
	        // Move to the right depth
	        while (depth--)
	            div = div.lastChild;
	
	        return ko.utils.makeArray(div.lastChild.childNodes);
	    }
	
	    function jQueryHtmlParse(html, documentContext) {
	        // jQuery's "parseHTML" function was introduced in jQuery 1.8.0 and is a documented public API.
	        if (jQueryInstance['parseHTML']) {
	            return jQueryInstance['parseHTML'](html, documentContext) || []; // Ensure we always return an array and never null
	        } else {
	            // For jQuery < 1.8.0, we fall back on the undocumented internal "clean" function.
	            var elems = jQueryInstance['clean']([html], documentContext);
	
	            // As of jQuery 1.7.1, jQuery parses the HTML by appending it to some dummy parent nodes held in an in-memory document fragment.
	            // Unfortunately, it never clears the dummy parent nodes from the document fragment, so it leaks memory over time.
	            // Fix this by finding the top-most dummy parent element, and detaching it from its owner fragment.
	            if (elems && elems[0]) {
	                // Find the top-most parent element that's a direct child of a document fragment
	                var elem = elems[0];
	                while (elem.parentNode && elem.parentNode.nodeType !== 11 /* i.e., DocumentFragment */)
	                    elem = elem.parentNode;
	                // ... then detach it
	                if (elem.parentNode)
	                    elem.parentNode.removeChild(elem);
	            }
	
	            return elems;
	        }
	    }
	
	    ko.utils.parseHtmlFragment = function(html, documentContext) {
	        return jQueryInstance ?
	            jQueryHtmlParse(html, documentContext) :   // As below, benefit from jQuery's optimisations where possible
	            simpleHtmlParse(html, documentContext);  // ... otherwise, this simple logic will do in most common cases.
	    };
	
	    ko.utils.setHtml = function(node, html) {
	        ko.utils.emptyDomNode(node);
	
	        // There's no legitimate reason to display a stringified observable without unwrapping it, so we'll unwrap it
	        html = ko.utils.unwrapObservable(html);
	
	        if ((html !== null) && (html !== undefined)) {
	            if (typeof html != 'string')
	                html = html.toString();
	
	            // jQuery contains a lot of sophisticated code to parse arbitrary HTML fragments,
	            // for example <tr> elements which are not normally allowed to exist on their own.
	            // If you've referenced jQuery we'll use that rather than duplicating its code.
	            if (jQueryInstance) {
	                jQueryInstance(node)['html'](html);
	            } else {
	                // ... otherwise, use KO's own parsing logic.
	                var parsedNodes = ko.utils.parseHtmlFragment(html, node.ownerDocument);
	                for (var i = 0; i < parsedNodes.length; i++)
	                    node.appendChild(parsedNodes[i]);
	            }
	        }
	    };
	})();
	
	ko.exportSymbol('utils.parseHtmlFragment', ko.utils.parseHtmlFragment);
	ko.exportSymbol('utils.setHtml', ko.utils.setHtml);
	
	ko.memoization = (function () {
	    var memos = {};
	
	    function randomMax8HexChars() {
	        return (((1 + Math.random()) * 0x100000000) | 0).toString(16).substring(1);
	    }
	    function generateRandomId() {
	        return randomMax8HexChars() + randomMax8HexChars();
	    }
	    function findMemoNodes(rootNode, appendToArray) {
	        if (!rootNode)
	            return;
	        if (rootNode.nodeType == 8) {
	            var memoId = ko.memoization.parseMemoText(rootNode.nodeValue);
	            if (memoId != null)
	                appendToArray.push({ domNode: rootNode, memoId: memoId });
	        } else if (rootNode.nodeType == 1) {
	            for (var i = 0, childNodes = rootNode.childNodes, j = childNodes.length; i < j; i++)
	                findMemoNodes(childNodes[i], appendToArray);
	        }
	    }
	
	    return {
	        memoize: function (callback) {
	            if (typeof callback != "function")
	                throw new Error("You can only pass a function to ko.memoization.memoize()");
	            var memoId = generateRandomId();
	            memos[memoId] = callback;
	            return "<!--[ko_memo:" + memoId + "]-->";
	        },
	
	        unmemoize: function (memoId, callbackParams) {
	            var callback = memos[memoId];
	            if (callback === undefined)
	                throw new Error("Couldn't find any memo with ID " + memoId + ". Perhaps it's already been unmemoized.");
	            try {
	                callback.apply(null, callbackParams || []);
	                return true;
	            }
	            finally { delete memos[memoId]; }
	        },
	
	        unmemoizeDomNodeAndDescendants: function (domNode, extraCallbackParamsArray) {
	            var memos = [];
	            findMemoNodes(domNode, memos);
	            for (var i = 0, j = memos.length; i < j; i++) {
	                var node = memos[i].domNode;
	                var combinedParams = [node];
	                if (extraCallbackParamsArray)
	                    ko.utils.arrayPushAll(combinedParams, extraCallbackParamsArray);
	                ko.memoization.unmemoize(memos[i].memoId, combinedParams);
	                node.nodeValue = ""; // Neuter this node so we don't try to unmemoize it again
	                if (node.parentNode)
	                    node.parentNode.removeChild(node); // If possible, erase it totally (not always possible - someone else might just hold a reference to it then call unmemoizeDomNodeAndDescendants again)
	            }
	        },
	
	        parseMemoText: function (memoText) {
	            var match = memoText.match(/^\[ko_memo\:(.*?)\]$/);
	            return match ? match[1] : null;
	        }
	    };
	})();
	
	ko.exportSymbol('memoization', ko.memoization);
	ko.exportSymbol('memoization.memoize', ko.memoization.memoize);
	ko.exportSymbol('memoization.unmemoize', ko.memoization.unmemoize);
	ko.exportSymbol('memoization.parseMemoText', ko.memoization.parseMemoText);
	ko.exportSymbol('memoization.unmemoizeDomNodeAndDescendants', ko.memoization.unmemoizeDomNodeAndDescendants);
	ko.tasks = (function () {
	    var scheduler,
	        taskQueue = [],
	        taskQueueLength = 0,
	        nextHandle = 1,
	        nextIndexToProcess = 0;
	
	    if (window['MutationObserver']) {
	        // Chrome 27+, Firefox 14+, IE 11+, Opera 15+, Safari 6.1+
	        // From https://github.com/petkaantonov/bluebird * Copyright (c) 2014 Petka Antonov * License: MIT
	        scheduler = (function (callback) {
	            var div = document.createElement("div");
	            new MutationObserver(callback).observe(div, {attributes: true});
	            return function () { div.classList.toggle("foo"); };
	        })(scheduledProcess);
	    } else if (document && "onreadystatechange" in document.createElement("script")) {
	        // IE 6-10
	        // From https://github.com/YuzuJS/setImmediate * Copyright (c) 2012 Barnesandnoble.com, llc, Donavon West, and Domenic Denicola * License: MIT
	        scheduler = function (callback) {
	            var script = document.createElement("script");
	            script.onreadystatechange = function () {
	                script.onreadystatechange = null;
	                document.documentElement.removeChild(script);
	                script = null;
	                callback();
	            };
	            document.documentElement.appendChild(script);
	        };
	    } else {
	        scheduler = function (callback) {
	            setTimeout(callback, 0);
	        };
	    }
	
	    function processTasks() {
	        if (taskQueueLength) {
	            // Each mark represents the end of a logical group of tasks and the number of these groups is
	            // limited to prevent unchecked recursion.
	            var mark = taskQueueLength, countMarks = 0;
	
	            // nextIndexToProcess keeps track of where we are in the queue; processTasks can be called recursively without issue
	            for (var task; nextIndexToProcess < taskQueueLength; ) {
	                if (task = taskQueue[nextIndexToProcess++]) {
	                    if (nextIndexToProcess > mark) {
	                        if (++countMarks >= 5000) {
	                            nextIndexToProcess = taskQueueLength;   // skip all tasks remaining in the queue since any of them could be causing the recursion
	                            ko.utils.deferError(Error("'Too much recursion' after processing " + countMarks + " task groups."));
	                            break;
	                        }
	                        mark = taskQueueLength;
	                    }
	                    try {
	                        task();
	                    } catch (ex) {
	                        ko.utils.deferError(ex);
	                    }
	                }
	            }
	        }
	    }
	
	    function scheduledProcess() {
	        processTasks();
	
	        // Reset the queue
	        nextIndexToProcess = taskQueueLength = taskQueue.length = 0;
	    }
	
	    function scheduleTaskProcessing() {
	        ko.tasks['scheduler'](scheduledProcess);
	    }
	
	    var tasks = {
	        'scheduler': scheduler,     // Allow overriding the scheduler
	
	        schedule: function (func) {
	            if (!taskQueueLength) {
	                scheduleTaskProcessing();
	            }
	
	            taskQueue[taskQueueLength++] = func;
	            return nextHandle++;
	        },
	
	        cancel: function (handle) {
	            var index = handle - (nextHandle - taskQueueLength);
	            if (index >= nextIndexToProcess && index < taskQueueLength) {
	                taskQueue[index] = null;
	            }
	        },
	
	        // For testing only: reset the queue and return the previous queue length
	        'resetForTesting': function () {
	            var length = taskQueueLength - nextIndexToProcess;
	            nextIndexToProcess = taskQueueLength = taskQueue.length = 0;
	            return length;
	        },
	
	        runEarly: processTasks
	    };
	
	    return tasks;
	})();
	
	ko.exportSymbol('tasks', ko.tasks);
	ko.exportSymbol('tasks.schedule', ko.tasks.schedule);
	//ko.exportSymbol('tasks.cancel', ko.tasks.cancel);  "cancel" isn't minified
	ko.exportSymbol('tasks.runEarly', ko.tasks.runEarly);
	ko.extenders = {
	    'throttle': function(target, timeout) {
	        // Throttling means two things:
	
	        // (1) For dependent observables, we throttle *evaluations* so that, no matter how fast its dependencies
	        //     notify updates, the target doesn't re-evaluate (and hence doesn't notify) faster than a certain rate
	        target['throttleEvaluation'] = timeout;
	
	        // (2) For writable targets (observables, or writable dependent observables), we throttle *writes*
	        //     so the target cannot change value synchronously or faster than a certain rate
	        var writeTimeoutInstance = null;
	        return ko.dependentObservable({
	            'read': target,
	            'write': function(value) {
	                clearTimeout(writeTimeoutInstance);
	                writeTimeoutInstance = ko.utils.setTimeout(function() {
	                    target(value);
	                }, timeout);
	            }
	        });
	    },
	
	    'rateLimit': function(target, options) {
	        var timeout, method, limitFunction;
	
	        if (typeof options == 'number') {
	            timeout = options;
	        } else {
	            timeout = options['timeout'];
	            method = options['method'];
	        }
	
	        // rateLimit supersedes deferred updates
	        target._deferUpdates = false;
	
	        limitFunction = method == 'notifyWhenChangesStop' ?  debounce : throttle;
	        target.limit(function(callback) {
	            return limitFunction(callback, timeout);
	        });
	    },
	
	    'deferred': function(target, options) {
	        if (options !== true) {
	            throw new Error('The \'deferred\' extender only accepts the value \'true\', because it is not supported to turn deferral off once enabled.')
	        }
	
	        if (!target._deferUpdates) {
	            target._deferUpdates = true;
	            target.limit(function (callback) {
	                var handle;
	                return function () {
	                    ko.tasks.cancel(handle);
	                    handle = ko.tasks.schedule(callback);
	                    target['notifySubscribers'](undefined, 'dirty');
	                };
	            });
	        }
	    },
	
	    'notify': function(target, notifyWhen) {
	        target["equalityComparer"] = notifyWhen == "always" ?
	            null :  // null equalityComparer means to always notify
	            valuesArePrimitiveAndEqual;
	    }
	};
	
	var primitiveTypes = { 'undefined':1, 'boolean':1, 'number':1, 'string':1 };
	function valuesArePrimitiveAndEqual(a, b) {
	    var oldValueIsPrimitive = (a === null) || (typeof(a) in primitiveTypes);
	    return oldValueIsPrimitive ? (a === b) : false;
	}
	
	function throttle(callback, timeout) {
	    var timeoutInstance;
	    return function () {
	        if (!timeoutInstance) {
	            timeoutInstance = ko.utils.setTimeout(function () {
	                timeoutInstance = undefined;
	                callback();
	            }, timeout);
	        }
	    };
	}
	
	function debounce(callback, timeout) {
	    var timeoutInstance;
	    return function () {
	        clearTimeout(timeoutInstance);
	        timeoutInstance = ko.utils.setTimeout(callback, timeout);
	    };
	}
	
	function applyExtenders(requestedExtenders) {
	    var target = this;
	    if (requestedExtenders) {
	        ko.utils.objectForEach(requestedExtenders, function(key, value) {
	            var extenderHandler = ko.extenders[key];
	            if (typeof extenderHandler == 'function') {
	                target = extenderHandler(target, value) || target;
	            }
	        });
	    }
	    return target;
	}
	
	ko.exportSymbol('extenders', ko.extenders);
	
	ko.subscription = function (target, callback, disposeCallback) {
	    this._target = target;
	    this.callback = callback;
	    this.disposeCallback = disposeCallback;
	    this.isDisposed = false;
	    ko.exportProperty(this, 'dispose', this.dispose);
	};
	ko.subscription.prototype.dispose = function () {
	    this.isDisposed = true;
	    this.disposeCallback();
	};
	
	ko.subscribable = function () {
	    ko.utils.setPrototypeOfOrExtend(this, ko_subscribable_fn);
	    ko_subscribable_fn.init(this);
	}
	
	var defaultEvent = "change";
	
	// Moved out of "limit" to avoid the extra closure
	function limitNotifySubscribers(value, event) {
	    if (!event || event === defaultEvent) {
	        this._limitChange(value);
	    } else if (event === 'beforeChange') {
	        this._limitBeforeChange(value);
	    } else {
	        this._origNotifySubscribers(value, event);
	    }
	}
	
	var ko_subscribable_fn = {
	    init: function(instance) {
	        instance._subscriptions = {};
	        instance._versionNumber = 1;
	    },
	
	    subscribe: function (callback, callbackTarget, event) {
	        var self = this;
	
	        event = event || defaultEvent;
	        var boundCallback = callbackTarget ? callback.bind(callbackTarget) : callback;
	
	        var subscription = new ko.subscription(self, boundCallback, function () {
	            ko.utils.arrayRemoveItem(self._subscriptions[event], subscription);
	            if (self.afterSubscriptionRemove)
	                self.afterSubscriptionRemove(event);
	        });
	
	        if (self.beforeSubscriptionAdd)
	            self.beforeSubscriptionAdd(event);
	
	        if (!self._subscriptions[event])
	            self._subscriptions[event] = [];
	        self._subscriptions[event].push(subscription);
	
	        return subscription;
	    },
	
	    "notifySubscribers": function (valueToNotify, event) {
	        event = event || defaultEvent;
	        if (event === defaultEvent) {
	            this.updateVersion();
	        }
	        if (this.hasSubscriptionsForEvent(event)) {
	            try {
	                ko.dependencyDetection.begin(); // Begin suppressing dependency detection (by setting the top frame to undefined)
	                for (var a = this._subscriptions[event].slice(0), i = 0, subscription; subscription = a[i]; ++i) {
	                    // In case a subscription was disposed during the arrayForEach cycle, check
	                    // for isDisposed on each subscription before invoking its callback
	                    if (!subscription.isDisposed)
	                        subscription.callback(valueToNotify);
	                }
	            } finally {
	                ko.dependencyDetection.end(); // End suppressing dependency detection
	            }
	        }
	    },
	
	    getVersion: function () {
	        return this._versionNumber;
	    },
	
	    hasChanged: function (versionToCheck) {
	        return this.getVersion() !== versionToCheck;
	    },
	
	    updateVersion: function () {
	        ++this._versionNumber;
	    },
	
	    limit: function(limitFunction) {
	        var self = this, selfIsObservable = ko.isObservable(self),
	            ignoreBeforeChange, previousValue, pendingValue, beforeChange = 'beforeChange';
	
	        if (!self._origNotifySubscribers) {
	            self._origNotifySubscribers = self["notifySubscribers"];
	            self["notifySubscribers"] = limitNotifySubscribers;
	        }
	
	        var finish = limitFunction(function() {
	            self._notificationIsPending = false;
	
	            // If an observable provided a reference to itself, access it to get the latest value.
	            // This allows computed observables to delay calculating their value until needed.
	            if (selfIsObservable && pendingValue === self) {
	                pendingValue = self();
	            }
	            ignoreBeforeChange = false;
	            if (self.isDifferent(previousValue, pendingValue)) {
	                self._origNotifySubscribers(previousValue = pendingValue);
	            }
	        });
	
	        self._limitChange = function(value) {
	            self._notificationIsPending = ignoreBeforeChange = true;
	            pendingValue = value;
	            finish();
	        };
	        self._limitBeforeChange = function(value) {
	            if (!ignoreBeforeChange) {
	                previousValue = value;
	                self._origNotifySubscribers(value, beforeChange);
	            }
	        };
	    },
	
	    hasSubscriptionsForEvent: function(event) {
	        return this._subscriptions[event] && this._subscriptions[event].length;
	    },
	
	    getSubscriptionsCount: function (event) {
	        if (event) {
	            return this._subscriptions[event] && this._subscriptions[event].length || 0;
	        } else {
	            var total = 0;
	            ko.utils.objectForEach(this._subscriptions, function(eventName, subscriptions) {
	                if (eventName !== 'dirty')
	                    total += subscriptions.length;
	            });
	            return total;
	        }
	    },
	
	    isDifferent: function(oldValue, newValue) {
	        return !this['equalityComparer'] || !this['equalityComparer'](oldValue, newValue);
	    },
	
	    extend: applyExtenders
	};
	
	ko.exportProperty(ko_subscribable_fn, 'subscribe', ko_subscribable_fn.subscribe);
	ko.exportProperty(ko_subscribable_fn, 'extend', ko_subscribable_fn.extend);
	ko.exportProperty(ko_subscribable_fn, 'getSubscriptionsCount', ko_subscribable_fn.getSubscriptionsCount);
	
	// For browsers that support proto assignment, we overwrite the prototype of each
	// observable instance. Since observables are functions, we need Function.prototype
	// to still be in the prototype chain.
	if (ko.utils.canSetPrototype) {
	    ko.utils.setPrototypeOf(ko_subscribable_fn, Function.prototype);
	}
	
	ko.subscribable['fn'] = ko_subscribable_fn;
	
	
	ko.isSubscribable = function (instance) {
	    return instance != null && typeof instance.subscribe == "function" && typeof instance["notifySubscribers"] == "function";
	};
	
	ko.exportSymbol('subscribable', ko.subscribable);
	ko.exportSymbol('isSubscribable', ko.isSubscribable);
	
	ko.computedContext = ko.dependencyDetection = (function () {
	    var outerFrames = [],
	        currentFrame,
	        lastId = 0;
	
	    // Return a unique ID that can be assigned to an observable for dependency tracking.
	    // Theoretically, you could eventually overflow the number storage size, resulting
	    // in duplicate IDs. But in JavaScript, the largest exact integral value is 2^53
	    // or 9,007,199,254,740,992. If you created 1,000,000 IDs per second, it would
	    // take over 285 years to reach that number.
	    // Reference http://blog.vjeux.com/2010/javascript/javascript-max_int-number-limits.html
	    function getId() {
	        return ++lastId;
	    }
	
	    function begin(options) {
	        outerFrames.push(currentFrame);
	        currentFrame = options;
	    }
	
	    function end() {
	        currentFrame = outerFrames.pop();
	    }
	
	    return {
	        begin: begin,
	
	        end: end,
	
	        registerDependency: function (subscribable) {
	            if (currentFrame) {
	                if (!ko.isSubscribable(subscribable))
	                    throw new Error("Only subscribable things can act as dependencies");
	                currentFrame.callback.call(currentFrame.callbackTarget, subscribable, subscribable._id || (subscribable._id = getId()));
	            }
	        },
	
	        ignore: function (callback, callbackTarget, callbackArgs) {
	            try {
	                begin();
	                return callback.apply(callbackTarget, callbackArgs || []);
	            } finally {
	                end();
	            }
	        },
	
	        getDependenciesCount: function () {
	            if (currentFrame)
	                return currentFrame.computed.getDependenciesCount();
	        },
	
	        isInitial: function() {
	            if (currentFrame)
	                return currentFrame.isInitial;
	        }
	    };
	})();
	
	ko.exportSymbol('computedContext', ko.computedContext);
	ko.exportSymbol('computedContext.getDependenciesCount', ko.computedContext.getDependenciesCount);
	ko.exportSymbol('computedContext.isInitial', ko.computedContext.isInitial);
	
	ko.exportSymbol('ignoreDependencies', ko.ignoreDependencies = ko.dependencyDetection.ignore);
	var observableLatestValue = ko.utils.createSymbolOrString('_latestValue');
	
	ko.observable = function (initialValue) {
	    function observable() {
	        if (arguments.length > 0) {
	            // Write
	
	            // Ignore writes if the value hasn't changed
	            if (observable.isDifferent(observable[observableLatestValue], arguments[0])) {
	                observable.valueWillMutate();
	                observable[observableLatestValue] = arguments[0];
	                observable.valueHasMutated();
	            }
	            return this; // Permits chained assignments
	        }
	        else {
	            // Read
	            ko.dependencyDetection.registerDependency(observable); // The caller only needs to be notified of changes if they did a "read" operation
	            return observable[observableLatestValue];
	        }
	    }
	
	    observable[observableLatestValue] = initialValue;
	
	    // Inherit from 'subscribable'
	    if (!ko.utils.canSetPrototype) {
	        // 'subscribable' won't be on the prototype chain unless we put it there directly
	        ko.utils.extend(observable, ko.subscribable['fn']);
	    }
	    ko.subscribable['fn'].init(observable);
	
	    // Inherit from 'observable'
	    ko.utils.setPrototypeOfOrExtend(observable, observableFn);
	
	    if (ko.options['deferUpdates']) {
	        ko.extenders['deferred'](observable, true);
	    }
	
	    return observable;
	}
	
	// Define prototype for observables
	var observableFn = {
	    'equalityComparer': valuesArePrimitiveAndEqual,
	    peek: function() { return this[observableLatestValue]; },
	    valueHasMutated: function () { this['notifySubscribers'](this[observableLatestValue]); },
	    valueWillMutate: function () { this['notifySubscribers'](this[observableLatestValue], 'beforeChange'); }
	};
	
	// Note that for browsers that don't support proto assignment, the
	// inheritance chain is created manually in the ko.observable constructor
	if (ko.utils.canSetPrototype) {
	    ko.utils.setPrototypeOf(observableFn, ko.subscribable['fn']);
	}
	
	var protoProperty = ko.observable.protoProperty = '__ko_proto__';
	observableFn[protoProperty] = ko.observable;
	
	ko.hasPrototype = function(instance, prototype) {
	    if ((instance === null) || (instance === undefined) || (instance[protoProperty] === undefined)) return false;
	    if (instance[protoProperty] === prototype) return true;
	    return ko.hasPrototype(instance[protoProperty], prototype); // Walk the prototype chain
	};
	
	ko.isObservable = function (instance) {
	    return ko.hasPrototype(instance, ko.observable);
	}
	ko.isWriteableObservable = function (instance) {
	    // Observable
	    if ((typeof instance == 'function') && instance[protoProperty] === ko.observable)
	        return true;
	    // Writeable dependent observable
	    if ((typeof instance == 'function') && (instance[protoProperty] === ko.dependentObservable) && (instance.hasWriteFunction))
	        return true;
	    // Anything else
	    return false;
	}
	
	ko.exportSymbol('observable', ko.observable);
	ko.exportSymbol('isObservable', ko.isObservable);
	ko.exportSymbol('isWriteableObservable', ko.isWriteableObservable);
	ko.exportSymbol('isWritableObservable', ko.isWriteableObservable);
	ko.exportSymbol('observable.fn', observableFn);
	ko.exportProperty(observableFn, 'peek', observableFn.peek);
	ko.exportProperty(observableFn, 'valueHasMutated', observableFn.valueHasMutated);
	ko.exportProperty(observableFn, 'valueWillMutate', observableFn.valueWillMutate);
	ko.observableArray = function (initialValues) {
	    initialValues = initialValues || [];
	
	    if (typeof initialValues != 'object' || !('length' in initialValues))
	        throw new Error("The argument passed when initializing an observable array must be an array, or null, or undefined.");
	
	    var result = ko.observable(initialValues);
	    ko.utils.setPrototypeOfOrExtend(result, ko.observableArray['fn']);
	    return result.extend({'trackArrayChanges':true});
	};
	
	ko.observableArray['fn'] = {
	    'remove': function (valueOrPredicate) {
	        var underlyingArray = this.peek();
	        var removedValues = [];
	        var predicate = typeof valueOrPredicate == "function" && !ko.isObservable(valueOrPredicate) ? valueOrPredicate : function (value) { return value === valueOrPredicate; };
	        for (var i = 0; i < underlyingArray.length; i++) {
	            var value = underlyingArray[i];
	            if (predicate(value)) {
	                if (removedValues.length === 0) {
	                    this.valueWillMutate();
	                }
	                removedValues.push(value);
	                underlyingArray.splice(i, 1);
	                i--;
	            }
	        }
	        if (removedValues.length) {
	            this.valueHasMutated();
	        }
	        return removedValues;
	    },
	
	    'removeAll': function (arrayOfValues) {
	        // If you passed zero args, we remove everything
	        if (arrayOfValues === undefined) {
	            var underlyingArray = this.peek();
	            var allValues = underlyingArray.slice(0);
	            this.valueWillMutate();
	            underlyingArray.splice(0, underlyingArray.length);
	            this.valueHasMutated();
	            return allValues;
	        }
	        // If you passed an arg, we interpret it as an array of entries to remove
	        if (!arrayOfValues)
	            return [];
	        return this['remove'](function (value) {
	            return ko.utils.arrayIndexOf(arrayOfValues, value) >= 0;
	        });
	    },
	
	    'destroy': function (valueOrPredicate) {
	        var underlyingArray = this.peek();
	        var predicate = typeof valueOrPredicate == "function" && !ko.isObservable(valueOrPredicate) ? valueOrPredicate : function (value) { return value === valueOrPredicate; };
	        this.valueWillMutate();
	        for (var i = underlyingArray.length - 1; i >= 0; i--) {
	            var value = underlyingArray[i];
	            if (predicate(value))
	                underlyingArray[i]["_destroy"] = true;
	        }
	        this.valueHasMutated();
	    },
	
	    'destroyAll': function (arrayOfValues) {
	        // If you passed zero args, we destroy everything
	        if (arrayOfValues === undefined)
	            return this['destroy'](function() { return true });
	
	        // If you passed an arg, we interpret it as an array of entries to destroy
	        if (!arrayOfValues)
	            return [];
	        return this['destroy'](function (value) {
	            return ko.utils.arrayIndexOf(arrayOfValues, value) >= 0;
	        });
	    },
	
	    'indexOf': function (item) {
	        var underlyingArray = this();
	        return ko.utils.arrayIndexOf(underlyingArray, item);
	    },
	
	    'replace': function(oldItem, newItem) {
	        var index = this['indexOf'](oldItem);
	        if (index >= 0) {
	            this.valueWillMutate();
	            this.peek()[index] = newItem;
	            this.valueHasMutated();
	        }
	    }
	};
	
	// Note that for browsers that don't support proto assignment, the
	// inheritance chain is created manually in the ko.observableArray constructor
	if (ko.utils.canSetPrototype) {
	    ko.utils.setPrototypeOf(ko.observableArray['fn'], ko.observable['fn']);
	}
	
	// Populate ko.observableArray.fn with read/write functions from native arrays
	// Important: Do not add any additional functions here that may reasonably be used to *read* data from the array
	// because we'll eval them without causing subscriptions, so ko.computed output could end up getting stale
	ko.utils.arrayForEach(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (methodName) {
	    ko.observableArray['fn'][methodName] = function () {
	        // Use "peek" to avoid creating a subscription in any computed that we're executing in the context of
	        // (for consistency with mutating regular observables)
	        var underlyingArray = this.peek();
	        this.valueWillMutate();
	        this.cacheDiffForKnownOperation(underlyingArray, methodName, arguments);
	        var methodCallResult = underlyingArray[methodName].apply(underlyingArray, arguments);
	        this.valueHasMutated();
	        // The native sort and reverse methods return a reference to the array, but it makes more sense to return the observable array instead.
	        return methodCallResult === underlyingArray ? this : methodCallResult;
	    };
	});
	
	// Populate ko.observableArray.fn with read-only functions from native arrays
	ko.utils.arrayForEach(["slice"], function (methodName) {
	    ko.observableArray['fn'][methodName] = function () {
	        var underlyingArray = this();
	        return underlyingArray[methodName].apply(underlyingArray, arguments);
	    };
	});
	
	ko.exportSymbol('observableArray', ko.observableArray);
	var arrayChangeEventName = 'arrayChange';
	ko.extenders['trackArrayChanges'] = function(target, options) {
	    // Use the provided options--each call to trackArrayChanges overwrites the previously set options
	    target.compareArrayOptions = {};
	    if (options && typeof options == "object") {
	        ko.utils.extend(target.compareArrayOptions, options);
	    }
	    target.compareArrayOptions['sparse'] = true;
	
	    // Only modify the target observable once
	    if (target.cacheDiffForKnownOperation) {
	        return;
	    }
	    var trackingChanges = false,
	        cachedDiff = null,
	        arrayChangeSubscription,
	        pendingNotifications = 0,
	        underlyingNotifySubscribersFunction,
	        underlyingBeforeSubscriptionAddFunction = target.beforeSubscriptionAdd,
	        underlyingAfterSubscriptionRemoveFunction = target.afterSubscriptionRemove;
	
	    // Watch "subscribe" calls, and for array change events, ensure change tracking is enabled
	    target.beforeSubscriptionAdd = function (event) {
	        if (underlyingBeforeSubscriptionAddFunction)
	            underlyingBeforeSubscriptionAddFunction.call(target, event);
	        if (event === arrayChangeEventName) {
	            trackChanges();
	        }
	    };
	    // Watch "dispose" calls, and for array change events, ensure change tracking is disabled when all are disposed
	    target.afterSubscriptionRemove = function (event) {
	        if (underlyingAfterSubscriptionRemoveFunction)
	            underlyingAfterSubscriptionRemoveFunction.call(target, event);
	        if (event === arrayChangeEventName && !target.hasSubscriptionsForEvent(arrayChangeEventName)) {
	            if (underlyingNotifySubscribersFunction) {
	                target['notifySubscribers'] = underlyingNotifySubscribersFunction;
	                underlyingNotifySubscribersFunction = undefined;
	            }
	            arrayChangeSubscription.dispose();
	            trackingChanges = false;
	        }
	    };
	
	    function trackChanges() {
	        // Calling 'trackChanges' multiple times is the same as calling it once
	        if (trackingChanges) {
	            return;
	        }
	
	        trackingChanges = true;
	
	        // Intercept "notifySubscribers" to track how many times it was called.
	        underlyingNotifySubscribersFunction = target['notifySubscribers'];
	        target['notifySubscribers'] = function(valueToNotify, event) {
	            if (!event || event === defaultEvent) {
	                ++pendingNotifications;
	            }
	            return underlyingNotifySubscribersFunction.apply(this, arguments);
	        };
	
	        // Each time the array changes value, capture a clone so that on the next
	        // change it's possible to produce a diff
	        var previousContents = [].concat(target.peek() || []);
	        cachedDiff = null;
	        arrayChangeSubscription = target.subscribe(function(currentContents) {
	            // Make a copy of the current contents and ensure it's an array
	            currentContents = [].concat(currentContents || []);
	
	            // Compute the diff and issue notifications, but only if someone is listening
	            if (target.hasSubscriptionsForEvent(arrayChangeEventName)) {
	                var changes = getChanges(previousContents, currentContents);
	            }
	
	            // Eliminate references to the old, removed items, so they can be GCed
	            previousContents = currentContents;
	            cachedDiff = null;
	            pendingNotifications = 0;
	
	            if (changes && changes.length) {
	                target['notifySubscribers'](changes, arrayChangeEventName);
	            }
	        });
	    }
	
	    function getChanges(previousContents, currentContents) {
	        // We try to re-use cached diffs.
	        // The scenarios where pendingNotifications > 1 are when using rate-limiting or the Deferred Updates
	        // plugin, which without this check would not be compatible with arrayChange notifications. Normally,
	        // notifications are issued immediately so we wouldn't be queueing up more than one.
	        if (!cachedDiff || pendingNotifications > 1) {
	            cachedDiff = ko.utils.compareArrays(previousContents, currentContents, target.compareArrayOptions);
	        }
	
	        return cachedDiff;
	    }
	
	    target.cacheDiffForKnownOperation = function(rawArray, operationName, args) {
	        // Only run if we're currently tracking changes for this observable array
	        // and there aren't any pending deferred notifications.
	        if (!trackingChanges || pendingNotifications) {
	            return;
	        }
	        var diff = [],
	            arrayLength = rawArray.length,
	            argsLength = args.length,
	            offset = 0;
	
	        function pushDiff(status, value, index) {
	            return diff[diff.length] = { 'status': status, 'value': value, 'index': index };
	        }
	        switch (operationName) {
	            case 'push':
	                offset = arrayLength;
	            case 'unshift':
	                for (var index = 0; index < argsLength; index++) {
	                    pushDiff('added', args[index], offset + index);
	                }
	                break;
	
	            case 'pop':
	                offset = arrayLength - 1;
	            case 'shift':
	                if (arrayLength) {
	                    pushDiff('deleted', rawArray[offset], offset);
	                }
	                break;
	
	            case 'splice':
	                // Negative start index means 'from end of array'. After that we clamp to [0...arrayLength].
	                // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
	                var startIndex = Math.min(Math.max(0, args[0] < 0 ? arrayLength + args[0] : args[0]), arrayLength),
	                    endDeleteIndex = argsLength === 1 ? arrayLength : Math.min(startIndex + (args[1] || 0), arrayLength),
	                    endAddIndex = startIndex + argsLength - 2,
	                    endIndex = Math.max(endDeleteIndex, endAddIndex),
	                    additions = [], deletions = [];
	                for (var index = startIndex, argsIndex = 2; index < endIndex; ++index, ++argsIndex) {
	                    if (index < endDeleteIndex)
	                        deletions.push(pushDiff('deleted', rawArray[index], index));
	                    if (index < endAddIndex)
	                        additions.push(pushDiff('added', args[argsIndex], index));
	                }
	                ko.utils.findMovesInArrayComparison(deletions, additions);
	                break;
	
	            default:
	                return;
	        }
	        cachedDiff = diff;
	    };
	};
	var computedState = ko.utils.createSymbolOrString('_state');
	
	ko.computed = ko.dependentObservable = function (evaluatorFunctionOrOptions, evaluatorFunctionTarget, options) {
	    if (typeof evaluatorFunctionOrOptions === "object") {
	        // Single-parameter syntax - everything is on this "options" param
	        options = evaluatorFunctionOrOptions;
	    } else {
	        // Multi-parameter syntax - construct the options according to the params passed
	        options = options || {};
	        if (evaluatorFunctionOrOptions) {
	            options["read"] = evaluatorFunctionOrOptions;
	        }
	    }
	    if (typeof options["read"] != "function")
	        throw Error("Pass a function that returns the value of the ko.computed");
	
	    var writeFunction = options["write"];
	    var state = {
	        latestValue: undefined,
	        isStale: true,
	        isBeingEvaluated: false,
	        suppressDisposalUntilDisposeWhenReturnsFalse: false,
	        isDisposed: false,
	        pure: false,
	        isSleeping: false,
	        readFunction: options["read"],
	        evaluatorFunctionTarget: evaluatorFunctionTarget || options["owner"],
	        disposeWhenNodeIsRemoved: options["disposeWhenNodeIsRemoved"] || options.disposeWhenNodeIsRemoved || null,
	        disposeWhen: options["disposeWhen"] || options.disposeWhen,
	        domNodeDisposalCallback: null,
	        dependencyTracking: {},
	        dependenciesCount: 0,
	        evaluationTimeoutInstance: null
	    };
	
	    function computedObservable() {
	        if (arguments.length > 0) {
	            if (typeof writeFunction === "function") {
	                // Writing a value
	                writeFunction.apply(state.evaluatorFunctionTarget, arguments);
	            } else {
	                throw new Error("Cannot write a value to a ko.computed unless you specify a 'write' option. If you wish to read the current value, don't pass any parameters.");
	            }
	            return this; // Permits chained assignments
	        } else {
	            // Reading the value
	            ko.dependencyDetection.registerDependency(computedObservable);
	            if (state.isStale || (state.isSleeping && computedObservable.haveDependenciesChanged())) {
	                computedObservable.evaluateImmediate();
	            }
	            return state.latestValue;
	        }
	    }
	
	    computedObservable[computedState] = state;
	    computedObservable.hasWriteFunction = typeof writeFunction === "function";
	
	    // Inherit from 'subscribable'
	    if (!ko.utils.canSetPrototype) {
	        // 'subscribable' won't be on the prototype chain unless we put it there directly
	        ko.utils.extend(computedObservable, ko.subscribable['fn']);
	    }
	    ko.subscribable['fn'].init(computedObservable);
	
	    // Inherit from 'computed'
	    ko.utils.setPrototypeOfOrExtend(computedObservable, computedFn);
	
	    if (options['pure']) {
	        state.pure = true;
	        state.isSleeping = true;     // Starts off sleeping; will awake on the first subscription
	        ko.utils.extend(computedObservable, pureComputedOverrides);
	    } else if (options['deferEvaluation']) {
	        ko.utils.extend(computedObservable, deferEvaluationOverrides);
	    }
	
	    if (ko.options['deferUpdates']) {
	        ko.extenders['deferred'](computedObservable, true);
	    }
	
	    if (DEBUG) {
	        // #1731 - Aid debugging by exposing the computed's options
	        computedObservable["_options"] = options;
	    }
	
	    if (state.disposeWhenNodeIsRemoved) {
	        // Since this computed is associated with a DOM node, and we don't want to dispose the computed
	        // until the DOM node is *removed* from the document (as opposed to never having been in the document),
	        // we'll prevent disposal until "disposeWhen" first returns false.
	        state.suppressDisposalUntilDisposeWhenReturnsFalse = true;
	
	        // disposeWhenNodeIsRemoved: true can be used to opt into the "only dispose after first false result"
	        // behaviour even if there's no specific node to watch. In that case, clear the option so we don't try
	        // to watch for a non-node's disposal. This technique is intended for KO's internal use only and shouldn't
	        // be documented or used by application code, as it's likely to change in a future version of KO.
	        if (!state.disposeWhenNodeIsRemoved.nodeType) {
	            state.disposeWhenNodeIsRemoved = null;
	        }
	    }
	
	    // Evaluate, unless sleeping or deferEvaluation is true
	    if (!state.isSleeping && !options['deferEvaluation']) {
	        computedObservable.evaluateImmediate();
	    }
	
	    // Attach a DOM node disposal callback so that the computed will be proactively disposed as soon as the node is
	    // removed using ko.removeNode. But skip if isActive is false (there will never be any dependencies to dispose).
	    if (state.disposeWhenNodeIsRemoved && computedObservable.isActive()) {
	        ko.utils.domNodeDisposal.addDisposeCallback(state.disposeWhenNodeIsRemoved, state.domNodeDisposalCallback = function () {
	            computedObservable.dispose();
	        });
	    }
	
	    return computedObservable;
	};
	
	// Utility function that disposes a given dependencyTracking entry
	function computedDisposeDependencyCallback(id, entryToDispose) {
	    if (entryToDispose !== null && entryToDispose.dispose) {
	        entryToDispose.dispose();
	    }
	}
	
	// This function gets called each time a dependency is detected while evaluating a computed.
	// It's factored out as a shared function to avoid creating unnecessary function instances during evaluation.
	function computedBeginDependencyDetectionCallback(subscribable, id) {
	    var computedObservable = this.computedObservable,
	        state = computedObservable[computedState];
	    if (!state.isDisposed) {
	        if (this.disposalCount && this.disposalCandidates[id]) {
	            // Don't want to dispose this subscription, as it's still being used
	            computedObservable.addDependencyTracking(id, subscribable, this.disposalCandidates[id]);
	            this.disposalCandidates[id] = null; // No need to actually delete the property - disposalCandidates is a transient object anyway
	            --this.disposalCount;
	        } else if (!state.dependencyTracking[id]) {
	            // Brand new subscription - add it
	            computedObservable.addDependencyTracking(id, subscribable, state.isSleeping ? { _target: subscribable } : computedObservable.subscribeToDependency(subscribable));
	        }
	    }
	}
	
	var computedFn = {
	    "equalityComparer": valuesArePrimitiveAndEqual,
	    getDependenciesCount: function () {
	        return this[computedState].dependenciesCount;
	    },
	    addDependencyTracking: function (id, target, trackingObj) {
	        if (this[computedState].pure && target === this) {
	            throw Error("A 'pure' computed must not be called recursively");
	        }
	
	        this[computedState].dependencyTracking[id] = trackingObj;
	        trackingObj._order = this[computedState].dependenciesCount++;
	        trackingObj._version = target.getVersion();
	    },
	    haveDependenciesChanged: function () {
	        var id, dependency, dependencyTracking = this[computedState].dependencyTracking;
	        for (id in dependencyTracking) {
	            if (dependencyTracking.hasOwnProperty(id)) {
	                dependency = dependencyTracking[id];
	                if (dependency._target.hasChanged(dependency._version)) {
	                    return true;
	                }
	            }
	        }
	    },
	    markDirty: function () {
	        // Process "dirty" events if we can handle delayed notifications
	        if (this._evalDelayed && !this[computedState].isBeingEvaluated) {
	            this._evalDelayed();
	        }
	    },
	    isActive: function () {
	        return this[computedState].isStale || this[computedState].dependenciesCount > 0;
	    },
	    respondToChange: function () {
	        // Ignore "change" events if we've already scheduled a delayed notification
	        if (!this._notificationIsPending) {
	            this.evaluatePossiblyAsync();
	        }
	    },
	    subscribeToDependency: function (target) {
	        if (target._deferUpdates && !this[computedState].disposeWhenNodeIsRemoved) {
	            var dirtySub = target.subscribe(this.markDirty, this, 'dirty'),
	                changeSub = target.subscribe(this.respondToChange, this);
	            return {
	                _target: target,
	                dispose: function () {
	                    dirtySub.dispose();
	                    changeSub.dispose();
	                }
	            };
	        } else {
	            return target.subscribe(this.evaluatePossiblyAsync, this);
	        }
	    },
	    evaluatePossiblyAsync: function () {
	        var computedObservable = this,
	            throttleEvaluationTimeout = computedObservable['throttleEvaluation'];
	        if (throttleEvaluationTimeout && throttleEvaluationTimeout >= 0) {
	            clearTimeout(this[computedState].evaluationTimeoutInstance);
	            this[computedState].evaluationTimeoutInstance = ko.utils.setTimeout(function () {
	                computedObservable.evaluateImmediate(true /*notifyChange*/);
	            }, throttleEvaluationTimeout);
	        } else if (computedObservable._evalDelayed) {
	            computedObservable._evalDelayed();
	        } else {
	            computedObservable.evaluateImmediate(true /*notifyChange*/);
	        }
	    },
	    evaluateImmediate: function (notifyChange) {
	        var computedObservable = this,
	            state = computedObservable[computedState],
	            disposeWhen = state.disposeWhen,
	            changed = false;
	
	        if (state.isBeingEvaluated) {
	            // If the evaluation of a ko.computed causes side effects, it's possible that it will trigger its own re-evaluation.
	            // This is not desirable (it's hard for a developer to realise a chain of dependencies might cause this, and they almost
	            // certainly didn't intend infinite re-evaluations). So, for predictability, we simply prevent ko.computeds from causing
	            // their own re-evaluation. Further discussion at https://github.com/SteveSanderson/knockout/pull/387
	            return;
	        }
	
	        // Do not evaluate (and possibly capture new dependencies) if disposed
	        if (state.isDisposed) {
	            return;
	        }
	
	        if (state.disposeWhenNodeIsRemoved && !ko.utils.domNodeIsAttachedToDocument(state.disposeWhenNodeIsRemoved) || disposeWhen && disposeWhen()) {
	            // See comment above about suppressDisposalUntilDisposeWhenReturnsFalse
	            if (!state.suppressDisposalUntilDisposeWhenReturnsFalse) {
	                computedObservable.dispose();
	                return;
	            }
	        } else {
	            // It just did return false, so we can stop suppressing now
	            state.suppressDisposalUntilDisposeWhenReturnsFalse = false;
	        }
	
	        state.isBeingEvaluated = true;
	        try {
	            changed = this.evaluateImmediate_CallReadWithDependencyDetection(notifyChange);
	        } finally {
	            state.isBeingEvaluated = false;
	        }
	
	        if (!state.dependenciesCount) {
	            computedObservable.dispose();
	        }
	
	        return changed;
	    },
	    evaluateImmediate_CallReadWithDependencyDetection: function (notifyChange) {
	        // This function is really just part of the evaluateImmediate logic. You would never call it from anywhere else.
	        // Factoring it out into a separate function means it can be independent of the try/catch block in evaluateImmediate,
	        // which contributes to saving about 40% off the CPU overhead of computed evaluation (on V8 at least).
	
	        var computedObservable = this,
	            state = computedObservable[computedState],
	            changed = false;
	
	        // Initially, we assume that none of the subscriptions are still being used (i.e., all are candidates for disposal).
	        // Then, during evaluation, we cross off any that are in fact still being used.
	        var isInitial = state.pure ? undefined : !state.dependenciesCount,   // If we're evaluating when there are no previous dependencies, it must be the first time
	            dependencyDetectionContext = {
	                computedObservable: computedObservable,
	                disposalCandidates: state.dependencyTracking,
	                disposalCount: state.dependenciesCount
	            };
	
	        ko.dependencyDetection.begin({
	            callbackTarget: dependencyDetectionContext,
	            callback: computedBeginDependencyDetectionCallback,
	            computed: computedObservable,
	            isInitial: isInitial
	        });
	
	        state.dependencyTracking = {};
	        state.dependenciesCount = 0;
	
	        var newValue = this.evaluateImmediate_CallReadThenEndDependencyDetection(state, dependencyDetectionContext);
	
	        if (computedObservable.isDifferent(state.latestValue, newValue)) {
	            if (!state.isSleeping) {
	                computedObservable["notifySubscribers"](state.latestValue, "beforeChange");
	            }
	
	            state.latestValue = newValue;
	            if (DEBUG) computedObservable._latestValue = newValue;
	
	            if (state.isSleeping) {
	                computedObservable.updateVersion();
	            } else if (notifyChange) {
	                computedObservable["notifySubscribers"](state.latestValue);
	            }
	
	            changed = true;
	        }
	
	        if (isInitial) {
	            computedObservable["notifySubscribers"](state.latestValue, "awake");
	        }
	
	        return changed;
	    },
	    evaluateImmediate_CallReadThenEndDependencyDetection: function (state, dependencyDetectionContext) {
	        // This function is really part of the evaluateImmediate_CallReadWithDependencyDetection logic.
	        // You'd never call it from anywhere else. Factoring it out means that evaluateImmediate_CallReadWithDependencyDetection
	        // can be independent of try/finally blocks, which contributes to saving about 40% off the CPU
	        // overhead of computed evaluation (on V8 at least).
	
	        try {
	            var readFunction = state.readFunction;
	            return state.evaluatorFunctionTarget ? readFunction.call(state.evaluatorFunctionTarget) : readFunction();
	        } finally {
	            ko.dependencyDetection.end();
	
	            // For each subscription no longer being used, remove it from the active subscriptions list and dispose it
	            if (dependencyDetectionContext.disposalCount && !state.isSleeping) {
	                ko.utils.objectForEach(dependencyDetectionContext.disposalCandidates, computedDisposeDependencyCallback);
	            }
	
	            state.isStale = false;
	        }
	    },
	    peek: function () {
	        // Peek won't re-evaluate, except while the computed is sleeping or to get the initial value when "deferEvaluation" is set.
	        var state = this[computedState];
	        if ((state.isStale && !state.dependenciesCount) || (state.isSleeping && this.haveDependenciesChanged())) {
	            this.evaluateImmediate();
	        }
	        return state.latestValue;
	    },
	    limit: function (limitFunction) {
	        // Override the limit function with one that delays evaluation as well
	        ko.subscribable['fn'].limit.call(this, limitFunction);
	        this._evalDelayed = function () {
	            this._limitBeforeChange(this[computedState].latestValue);
	
	            this[computedState].isStale = true; // Mark as dirty
	
	            // Pass the observable to the "limit" code, which will access it when
	            // it's time to do the notification.
	            this._limitChange(this);
	        }
	    },
	    dispose: function () {
	        var state = this[computedState];
	        if (!state.isSleeping && state.dependencyTracking) {
	            ko.utils.objectForEach(state.dependencyTracking, function (id, dependency) {
	                if (dependency.dispose)
	                    dependency.dispose();
	            });
	        }
	        if (state.disposeWhenNodeIsRemoved && state.domNodeDisposalCallback) {
	            ko.utils.domNodeDisposal.removeDisposeCallback(state.disposeWhenNodeIsRemoved, state.domNodeDisposalCallback);
	        }
	        state.dependencyTracking = null;
	        state.dependenciesCount = 0;
	        state.isDisposed = true;
	        state.isStale = false;
	        state.isSleeping = false;
	        state.disposeWhenNodeIsRemoved = null;
	    }
	};
	
	var pureComputedOverrides = {
	    beforeSubscriptionAdd: function (event) {
	        // If asleep, wake up the computed by subscribing to any dependencies.
	        var computedObservable = this,
	            state = computedObservable[computedState];
	        if (!state.isDisposed && state.isSleeping && event == 'change') {
	            state.isSleeping = false;
	            if (state.isStale || computedObservable.haveDependenciesChanged()) {
	                state.dependencyTracking = null;
	                state.dependenciesCount = 0;
	                state.isStale = true;
	                if (computedObservable.evaluateImmediate()) {
	                    computedObservable.updateVersion();
	                }
	            } else {
	                // First put the dependencies in order
	                var dependeciesOrder = [];
	                ko.utils.objectForEach(state.dependencyTracking, function (id, dependency) {
	                    dependeciesOrder[dependency._order] = id;
	                });
	                // Next, subscribe to each one
	                ko.utils.arrayForEach(dependeciesOrder, function (id, order) {
	                    var dependency = state.dependencyTracking[id],
	                        subscription = computedObservable.subscribeToDependency(dependency._target);
	                    subscription._order = order;
	                    subscription._version = dependency._version;
	                    state.dependencyTracking[id] = subscription;
	                });
	            }
	            if (!state.isDisposed) {     // test since evaluating could trigger disposal
	                computedObservable["notifySubscribers"](state.latestValue, "awake");
	            }
	        }
	    },
	    afterSubscriptionRemove: function (event) {
	        var state = this[computedState];
	        if (!state.isDisposed && event == 'change' && !this.hasSubscriptionsForEvent('change')) {
	            ko.utils.objectForEach(state.dependencyTracking, function (id, dependency) {
	                if (dependency.dispose) {
	                    state.dependencyTracking[id] = {
	                        _target: dependency._target,
	                        _order: dependency._order,
	                        _version: dependency._version
	                    };
	                    dependency.dispose();
	                }
	            });
	            state.isSleeping = true;
	            this["notifySubscribers"](undefined, "asleep");
	        }
	    },
	    getVersion: function () {
	        // Because a pure computed is not automatically updated while it is sleeping, we can't
	        // simply return the version number. Instead, we check if any of the dependencies have
	        // changed and conditionally re-evaluate the computed observable.
	        var state = this[computedState];
	        if (state.isSleeping && (state.isStale || this.haveDependenciesChanged())) {
	            this.evaluateImmediate();
	        }
	        return ko.subscribable['fn'].getVersion.call(this);
	    }
	};
	
	var deferEvaluationOverrides = {
	    beforeSubscriptionAdd: function (event) {
	        // This will force a computed with deferEvaluation to evaluate when the first subscription is registered.
	        if (event == 'change' || event == 'beforeChange') {
	            this.peek();
	        }
	    }
	};
	
	// Note that for browsers that don't support proto assignment, the
	// inheritance chain is created manually in the ko.computed constructor
	if (ko.utils.canSetPrototype) {
	    ko.utils.setPrototypeOf(computedFn, ko.subscribable['fn']);
	}
	
	// Set the proto chain values for ko.hasPrototype
	var protoProp = ko.observable.protoProperty; // == "__ko_proto__"
	ko.computed[protoProp] = ko.observable;
	computedFn[protoProp] = ko.computed;
	
	ko.isComputed = function (instance) {
	    return ko.hasPrototype(instance, ko.computed);
	};
	
	ko.isPureComputed = function (instance) {
	    return ko.hasPrototype(instance, ko.computed)
	        && instance[computedState] && instance[computedState].pure;
	};
	
	ko.exportSymbol('computed', ko.computed);
	ko.exportSymbol('dependentObservable', ko.computed);    // export ko.dependentObservable for backwards compatibility (1.x)
	ko.exportSymbol('isComputed', ko.isComputed);
	ko.exportSymbol('isPureComputed', ko.isPureComputed);
	ko.exportSymbol('computed.fn', computedFn);
	ko.exportProperty(computedFn, 'peek', computedFn.peek);
	ko.exportProperty(computedFn, 'dispose', computedFn.dispose);
	ko.exportProperty(computedFn, 'isActive', computedFn.isActive);
	ko.exportProperty(computedFn, 'getDependenciesCount', computedFn.getDependenciesCount);
	
	ko.pureComputed = function (evaluatorFunctionOrOptions, evaluatorFunctionTarget) {
	    if (typeof evaluatorFunctionOrOptions === 'function') {
	        return ko.computed(evaluatorFunctionOrOptions, evaluatorFunctionTarget, {'pure':true});
	    } else {
	        evaluatorFunctionOrOptions = ko.utils.extend({}, evaluatorFunctionOrOptions);   // make a copy of the parameter object
	        evaluatorFunctionOrOptions['pure'] = true;
	        return ko.computed(evaluatorFunctionOrOptions, evaluatorFunctionTarget);
	    }
	}
	ko.exportSymbol('pureComputed', ko.pureComputed);
	
	(function() {
	    var maxNestedObservableDepth = 10; // Escape the (unlikely) pathalogical case where an observable's current value is itself (or similar reference cycle)
	
	    ko.toJS = function(rootObject) {
	        if (arguments.length == 0)
	            throw new Error("When calling ko.toJS, pass the object you want to convert.");
	
	        // We just unwrap everything at every level in the object graph
	        return mapJsObjectGraph(rootObject, function(valueToMap) {
	            // Loop because an observable's value might in turn be another observable wrapper
	            for (var i = 0; ko.isObservable(valueToMap) && (i < maxNestedObservableDepth); i++)
	                valueToMap = valueToMap();
	            return valueToMap;
	        });
	    };
	
	    ko.toJSON = function(rootObject, replacer, space) {     // replacer and space are optional
	        var plainJavaScriptObject = ko.toJS(rootObject);
	        return ko.utils.stringifyJson(plainJavaScriptObject, replacer, space);
	    };
	
	    function mapJsObjectGraph(rootObject, mapInputCallback, visitedObjects) {
	        visitedObjects = visitedObjects || new objectLookup();
	
	        rootObject = mapInputCallback(rootObject);
	        var canHaveProperties = (typeof rootObject == "object") && (rootObject !== null) && (rootObject !== undefined) && (!(rootObject instanceof RegExp)) && (!(rootObject instanceof Date)) && (!(rootObject instanceof String)) && (!(rootObject instanceof Number)) && (!(rootObject instanceof Boolean));
	        if (!canHaveProperties)
	            return rootObject;
	
	        var outputProperties = rootObject instanceof Array ? [] : {};
	        visitedObjects.save(rootObject, outputProperties);
	
	        visitPropertiesOrArrayEntries(rootObject, function(indexer) {
	            var propertyValue = mapInputCallback(rootObject[indexer]);
	
	            switch (typeof propertyValue) {
	                case "boolean":
	                case "number":
	                case "string":
	                case "function":
	                    outputProperties[indexer] = propertyValue;
	                    break;
	                case "object":
	                case "undefined":
	                    var previouslyMappedValue = visitedObjects.get(propertyValue);
	                    outputProperties[indexer] = (previouslyMappedValue !== undefined)
	                        ? previouslyMappedValue
	                        : mapJsObjectGraph(propertyValue, mapInputCallback, visitedObjects);
	                    break;
	            }
	        });
	
	        return outputProperties;
	    }
	
	    function visitPropertiesOrArrayEntries(rootObject, visitorCallback) {
	        if (rootObject instanceof Array) {
	            for (var i = 0; i < rootObject.length; i++)
	                visitorCallback(i);
	
	            // For arrays, also respect toJSON property for custom mappings (fixes #278)
	            if (typeof rootObject['toJSON'] == 'function')
	                visitorCallback('toJSON');
	        } else {
	            for (var propertyName in rootObject) {
	                visitorCallback(propertyName);
	            }
	        }
	    };
	
	    function objectLookup() {
	        this.keys = [];
	        this.values = [];
	    };
	
	    objectLookup.prototype = {
	        constructor: objectLookup,
	        save: function(key, value) {
	            var existingIndex = ko.utils.arrayIndexOf(this.keys, key);
	            if (existingIndex >= 0)
	                this.values[existingIndex] = value;
	            else {
	                this.keys.push(key);
	                this.values.push(value);
	            }
	        },
	        get: function(key) {
	            var existingIndex = ko.utils.arrayIndexOf(this.keys, key);
	            return (existingIndex >= 0) ? this.values[existingIndex] : undefined;
	        }
	    };
	})();
	
	ko.exportSymbol('toJS', ko.toJS);
	ko.exportSymbol('toJSON', ko.toJSON);
	(function () {
	    var hasDomDataExpandoProperty = '__ko__hasDomDataOptionValue__';
	
	    // Normally, SELECT elements and their OPTIONs can only take value of type 'string' (because the values
	    // are stored on DOM attributes). ko.selectExtensions provides a way for SELECTs/OPTIONs to have values
	    // that are arbitrary objects. This is very convenient when implementing things like cascading dropdowns.
	    ko.selectExtensions = {
	        readValue : function(element) {
	            switch (ko.utils.tagNameLower(element)) {
	                case 'option':
	                    if (element[hasDomDataExpandoProperty] === true)
	                        return ko.utils.domData.get(element, ko.bindingHandlers.options.optionValueDomDataKey);
	                    return ko.utils.ieVersion <= 7
	                        ? (element.getAttributeNode('value') && element.getAttributeNode('value').specified ? element.value : element.text)
	                        : element.value;
	                case 'select':
	                    return element.selectedIndex >= 0 ? ko.selectExtensions.readValue(element.options[element.selectedIndex]) : undefined;
	                default:
	                    return element.value;
	            }
	        },
	
	        writeValue: function(element, value, allowUnset) {
	            switch (ko.utils.tagNameLower(element)) {
	                case 'option':
	                    switch(typeof value) {
	                        case "string":
	                            ko.utils.domData.set(element, ko.bindingHandlers.options.optionValueDomDataKey, undefined);
	                            if (hasDomDataExpandoProperty in element) { // IE <= 8 throws errors if you delete non-existent properties from a DOM node
	                                delete element[hasDomDataExpandoProperty];
	                            }
	                            element.value = value;
	                            break;
	                        default:
	                            // Store arbitrary object using DomData
	                            ko.utils.domData.set(element, ko.bindingHandlers.options.optionValueDomDataKey, value);
	                            element[hasDomDataExpandoProperty] = true;
	
	                            // Special treatment of numbers is just for backward compatibility. KO 1.2.1 wrote numerical values to element.value.
	                            element.value = typeof value === "number" ? value : "";
	                            break;
	                    }
	                    break;
	                case 'select':
	                    if (value === "" || value === null)       // A blank string or null value will select the caption
	                        value = undefined;
	                    var selection = -1;
	                    for (var i = 0, n = element.options.length, optionValue; i < n; ++i) {
	                        optionValue = ko.selectExtensions.readValue(element.options[i]);
	                        // Include special check to handle selecting a caption with a blank string value
	                        if (optionValue == value || (optionValue == "" && value === undefined)) {
	                            selection = i;
	                            break;
	                        }
	                    }
	                    if (allowUnset || selection >= 0 || (value === undefined && element.size > 1)) {
	                        element.selectedIndex = selection;
	                    }
	                    break;
	                default:
	                    if ((value === null) || (value === undefined))
	                        value = "";
	                    element.value = value;
	                    break;
	            }
	        }
	    };
	})();
	
	ko.exportSymbol('selectExtensions', ko.selectExtensions);
	ko.exportSymbol('selectExtensions.readValue', ko.selectExtensions.readValue);
	ko.exportSymbol('selectExtensions.writeValue', ko.selectExtensions.writeValue);
	ko.expressionRewriting = (function () {
	    var javaScriptReservedWords = ["true", "false", "null", "undefined"];
	
	    // Matches something that can be assigned to--either an isolated identifier or something ending with a property accessor
	    // This is designed to be simple and avoid false negatives, but could produce false positives (e.g., a+b.c).
	    // This also will not properly handle nested brackets (e.g., obj1[obj2['prop']]; see #911).
	    var javaScriptAssignmentTarget = /^(?:[$_a-z][$\w]*|(.+)(\.\s*[$_a-z][$\w]*|\[.+\]))$/i;
	
	    function getWriteableValue(expression) {
	        if (ko.utils.arrayIndexOf(javaScriptReservedWords, expression) >= 0)
	            return false;
	        var match = expression.match(javaScriptAssignmentTarget);
	        return match === null ? false : match[1] ? ('Object(' + match[1] + ')' + match[2]) : expression;
	    }
	
	    // The following regular expressions will be used to split an object-literal string into tokens
	
	        // These two match strings, either with double quotes or single quotes
	    var stringDouble = '"(?:[^"\\\\]|\\\\.)*"',
	        stringSingle = "'(?:[^'\\\\]|\\\\.)*'",
	        // Matches a regular expression (text enclosed by slashes), but will also match sets of divisions
	        // as a regular expression (this is handled by the parsing loop below).
	        stringRegexp = '/(?:[^/\\\\]|\\\\.)*/\w*',
	        // These characters have special meaning to the parser and must not appear in the middle of a
	        // token, except as part of a string.
	        specials = ',"\'{}()/:[\\]',
	        // Match text (at least two characters) that does not contain any of the above special characters,
	        // although some of the special characters are allowed to start it (all but the colon and comma).
	        // The text can contain spaces, but leading or trailing spaces are skipped.
	        everyThingElse = '[^\\s:,/][^' + specials + ']*[^\\s' + specials + ']',
	        // Match any non-space character not matched already. This will match colons and commas, since they're
	        // not matched by "everyThingElse", but will also match any other single character that wasn't already
	        // matched (for example: in "a: 1, b: 2", each of the non-space characters will be matched by oneNotSpace).
	        oneNotSpace = '[^\\s]',
	
	        // Create the actual regular expression by or-ing the above strings. The order is important.
	        bindingToken = RegExp(stringDouble + '|' + stringSingle + '|' + stringRegexp + '|' + everyThingElse + '|' + oneNotSpace, 'g'),
	
	        // Match end of previous token to determine whether a slash is a division or regex.
	        divisionLookBehind = /[\])"'A-Za-z0-9_$]+$/,
	        keywordRegexLookBehind = {'in':1,'return':1,'typeof':1};
	
	    function parseObjectLiteral(objectLiteralString) {
	        // Trim leading and trailing spaces from the string
	        var str = ko.utils.stringTrim(objectLiteralString);
	
	        // Trim braces '{' surrounding the whole object literal
	        if (str.charCodeAt(0) === 123) str = str.slice(1, -1);
	
	        // Split into tokens
	        var result = [], toks = str.match(bindingToken), key, values = [], depth = 0;
	
	        if (toks) {
	            // Append a comma so that we don't need a separate code block to deal with the last item
	            toks.push(',');
	
	            for (var i = 0, tok; tok = toks[i]; ++i) {
	                var c = tok.charCodeAt(0);
	                // A comma signals the end of a key/value pair if depth is zero
	                if (c === 44) { // ","
	                    if (depth <= 0) {
	                        result.push((key && values.length) ? {key: key, value: values.join('')} : {'unknown': key || values.join('')});
	                        key = depth = 0;
	                        values = [];
	                        continue;
	                    }
	                // Simply skip the colon that separates the name and value
	                } else if (c === 58) { // ":"
	                    if (!depth && !key && values.length === 1) {
	                        key = values.pop();
	                        continue;
	                    }
	                // A set of slashes is initially matched as a regular expression, but could be division
	                } else if (c === 47 && i && tok.length > 1) {  // "/"
	                    // Look at the end of the previous token to determine if the slash is actually division
	                    var match = toks[i-1].match(divisionLookBehind);
	                    if (match && !keywordRegexLookBehind[match[0]]) {
	                        // The slash is actually a division punctuator; re-parse the remainder of the string (not including the slash)
	                        str = str.substr(str.indexOf(tok) + 1);
	                        toks = str.match(bindingToken);
	                        toks.push(',');
	                        i = -1;
	                        // Continue with just the slash
	                        tok = '/';
	                    }
	                // Increment depth for parentheses, braces, and brackets so that interior commas are ignored
	                } else if (c === 40 || c === 123 || c === 91) { // '(', '{', '['
	                    ++depth;
	                } else if (c === 41 || c === 125 || c === 93) { // ')', '}', ']'
	                    --depth;
	                // The key will be the first token; if it's a string, trim the quotes
	                } else if (!key && !values.length && (c === 34 || c === 39)) { // '"', "'"
	                    tok = tok.slice(1, -1);
	                }
	                values.push(tok);
	            }
	        }
	        return result;
	    }
	
	    // Two-way bindings include a write function that allow the handler to update the value even if it's not an observable.
	    var twoWayBindings = {};
	
	    function preProcessBindings(bindingsStringOrKeyValueArray, bindingOptions) {
	        bindingOptions = bindingOptions || {};
	
	        function processKeyValue(key, val) {
	            var writableVal;
	            function callPreprocessHook(obj) {
	                return (obj && obj['preprocess']) ? (val = obj['preprocess'](val, key, processKeyValue)) : true;
	            }
	            if (!bindingParams) {
	                if (!callPreprocessHook(ko['getBindingHandler'](key)))
	                    return;
	
	                if (twoWayBindings[key] && (writableVal = getWriteableValue(val))) {
	                    // For two-way bindings, provide a write method in case the value
	                    // isn't a writable observable.
	                    propertyAccessorResultStrings.push("'" + key + "':function(_z){" + writableVal + "=_z}");
	                }
	            }
	            // Values are wrapped in a function so that each value can be accessed independently
	            if (makeValueAccessors) {
	                val = 'function(){return ' + val + ' }';
	            }
	            resultStrings.push("'" + key + "':" + val);
	        }
	
	        var resultStrings = [],
	            propertyAccessorResultStrings = [],
	            makeValueAccessors = bindingOptions['valueAccessors'],
	            bindingParams = bindingOptions['bindingParams'],
	            keyValueArray = typeof bindingsStringOrKeyValueArray === "string" ?
	                parseObjectLiteral(bindingsStringOrKeyValueArray) : bindingsStringOrKeyValueArray;
	
	        ko.utils.arrayForEach(keyValueArray, function(keyValue) {
	            processKeyValue(keyValue.key || keyValue['unknown'], keyValue.value);
	        });
	
	        if (propertyAccessorResultStrings.length)
	            processKeyValue('_ko_property_writers', "{" + propertyAccessorResultStrings.join(",") + " }");
	
	        return resultStrings.join(",");
	    }
	
	    return {
	        bindingRewriteValidators: [],
	
	        twoWayBindings: twoWayBindings,
	
	        parseObjectLiteral: parseObjectLiteral,
	
	        preProcessBindings: preProcessBindings,
	
	        keyValueArrayContainsKey: function(keyValueArray, key) {
	            for (var i = 0; i < keyValueArray.length; i++)
	                if (keyValueArray[i]['key'] == key)
	                    return true;
	            return false;
	        },
	
	        // Internal, private KO utility for updating model properties from within bindings
	        // property:            If the property being updated is (or might be) an observable, pass it here
	        //                      If it turns out to be a writable observable, it will be written to directly
	        // allBindings:         An object with a get method to retrieve bindings in the current execution context.
	        //                      This will be searched for a '_ko_property_writers' property in case you're writing to a non-observable
	        // key:                 The key identifying the property to be written. Example: for { hasFocus: myValue }, write to 'myValue' by specifying the key 'hasFocus'
	        // value:               The value to be written
	        // checkIfDifferent:    If true, and if the property being written is a writable observable, the value will only be written if
	        //                      it is !== existing value on that writable observable
	        writeValueToProperty: function(property, allBindings, key, value, checkIfDifferent) {
	            if (!property || !ko.isObservable(property)) {
	                var propWriters = allBindings.get('_ko_property_writers');
	                if (propWriters && propWriters[key])
	                    propWriters[key](value);
	            } else if (ko.isWriteableObservable(property) && (!checkIfDifferent || property.peek() !== value)) {
	                property(value);
	            }
	        }
	    };
	})();
	
	ko.exportSymbol('expressionRewriting', ko.expressionRewriting);
	ko.exportSymbol('expressionRewriting.bindingRewriteValidators', ko.expressionRewriting.bindingRewriteValidators);
	ko.exportSymbol('expressionRewriting.parseObjectLiteral', ko.expressionRewriting.parseObjectLiteral);
	ko.exportSymbol('expressionRewriting.preProcessBindings', ko.expressionRewriting.preProcessBindings);
	
	// Making bindings explicitly declare themselves as "two way" isn't ideal in the long term (it would be better if
	// all bindings could use an official 'property writer' API without needing to declare that they might). However,
	// since this is not, and has never been, a public API (_ko_property_writers was never documented), it's acceptable
	// as an internal implementation detail in the short term.
	// For those developers who rely on _ko_property_writers in their custom bindings, we expose _twoWayBindings as an
	// undocumented feature that makes it relatively easy to upgrade to KO 3.0. However, this is still not an official
	// public API, and we reserve the right to remove it at any time if we create a real public property writers API.
	ko.exportSymbol('expressionRewriting._twoWayBindings', ko.expressionRewriting.twoWayBindings);
	
	// For backward compatibility, define the following aliases. (Previously, these function names were misleading because
	// they referred to JSON specifically, even though they actually work with arbitrary JavaScript object literal expressions.)
	ko.exportSymbol('jsonExpressionRewriting', ko.expressionRewriting);
	ko.exportSymbol('jsonExpressionRewriting.insertPropertyAccessorsIntoJson', ko.expressionRewriting.preProcessBindings);
	(function() {
	    // "Virtual elements" is an abstraction on top of the usual DOM API which understands the notion that comment nodes
	    // may be used to represent hierarchy (in addition to the DOM's natural hierarchy).
	    // If you call the DOM-manipulating functions on ko.virtualElements, you will be able to read and write the state
	    // of that virtual hierarchy
	    //
	    // The point of all this is to support containerless templates (e.g., <!-- ko foreach:someCollection -->blah<!-- /ko -->)
	    // without having to scatter special cases all over the binding and templating code.
	
	    // IE 9 cannot reliably read the "nodeValue" property of a comment node (see https://github.com/SteveSanderson/knockout/issues/186)
	    // but it does give them a nonstandard alternative property called "text" that it can read reliably. Other browsers don't have that property.
	    // So, use node.text where available, and node.nodeValue elsewhere
	    var commentNodesHaveTextProperty = document && document.createComment("test").text === "<!--test-->";
	
	    var startCommentRegex = commentNodesHaveTextProperty ? /^<!--\s*ko(?:\s+([\s\S]+))?\s*-->$/ : /^\s*ko(?:\s+([\s\S]+))?\s*$/;
	    var endCommentRegex =   commentNodesHaveTextProperty ? /^<!--\s*\/ko\s*-->$/ : /^\s*\/ko\s*$/;
	    var htmlTagsWithOptionallyClosingChildren = { 'ul': true, 'ol': true };
	
	    function isStartComment(node) {
	        return (node.nodeType == 8) && startCommentRegex.test(commentNodesHaveTextProperty ? node.text : node.nodeValue);
	    }
	
	    function isEndComment(node) {
	        return (node.nodeType == 8) && endCommentRegex.test(commentNodesHaveTextProperty ? node.text : node.nodeValue);
	    }
	
	    function getVirtualChildren(startComment, allowUnbalanced) {
	        var currentNode = startComment;
	        var depth = 1;
	        var children = [];
	        while (currentNode = currentNode.nextSibling) {
	            if (isEndComment(currentNode)) {
	                depth--;
	                if (depth === 0)
	                    return children;
	            }
	
	            children.push(currentNode);
	
	            if (isStartComment(currentNode))
	                depth++;
	        }
	        if (!allowUnbalanced)
	            throw new Error("Cannot find closing comment tag to match: " + startComment.nodeValue);
	        return null;
	    }
	
	    function getMatchingEndComment(startComment, allowUnbalanced) {
	        var allVirtualChildren = getVirtualChildren(startComment, allowUnbalanced);
	        if (allVirtualChildren) {
	            if (allVirtualChildren.length > 0)
	                return allVirtualChildren[allVirtualChildren.length - 1].nextSibling;
	            return startComment.nextSibling;
	        } else
	            return null; // Must have no matching end comment, and allowUnbalanced is true
	    }
	
	    function getUnbalancedChildTags(node) {
	        // e.g., from <div>OK</div><!-- ko blah --><span>Another</span>, returns: <!-- ko blah --><span>Another</span>
	        //       from <div>OK</div><!-- /ko --><!-- /ko -->,             returns: <!-- /ko --><!-- /ko -->
	        var childNode = node.firstChild, captureRemaining = null;
	        if (childNode) {
	            do {
	                if (captureRemaining)                   // We already hit an unbalanced node and are now just scooping up all subsequent nodes
	                    captureRemaining.push(childNode);
	                else if (isStartComment(childNode)) {
	                    var matchingEndComment = getMatchingEndComment(childNode, /* allowUnbalanced: */ true);
	                    if (matchingEndComment)             // It's a balanced tag, so skip immediately to the end of this virtual set
	                        childNode = matchingEndComment;
	                    else
	                        captureRemaining = [childNode]; // It's unbalanced, so start capturing from this point
	                } else if (isEndComment(childNode)) {
	                    captureRemaining = [childNode];     // It's unbalanced (if it wasn't, we'd have skipped over it already), so start capturing
	                }
	            } while (childNode = childNode.nextSibling);
	        }
	        return captureRemaining;
	    }
	
	    ko.virtualElements = {
	        allowedBindings: {},
	
	        childNodes: function(node) {
	            return isStartComment(node) ? getVirtualChildren(node) : node.childNodes;
	        },
	
	        emptyNode: function(node) {
	            if (!isStartComment(node))
	                ko.utils.emptyDomNode(node);
	            else {
	                var virtualChildren = ko.virtualElements.childNodes(node);
	                for (var i = 0, j = virtualChildren.length; i < j; i++)
	                    ko.removeNode(virtualChildren[i]);
	            }
	        },
	
	        setDomNodeChildren: function(node, childNodes) {
	            if (!isStartComment(node))
	                ko.utils.setDomNodeChildren(node, childNodes);
	            else {
	                ko.virtualElements.emptyNode(node);
	                var endCommentNode = node.nextSibling; // Must be the next sibling, as we just emptied the children
	                for (var i = 0, j = childNodes.length; i < j; i++)
	                    endCommentNode.parentNode.insertBefore(childNodes[i], endCommentNode);
	            }
	        },
	
	        prepend: function(containerNode, nodeToPrepend) {
	            if (!isStartComment(containerNode)) {
	                if (containerNode.firstChild)
	                    containerNode.insertBefore(nodeToPrepend, containerNode.firstChild);
	                else
	                    containerNode.appendChild(nodeToPrepend);
	            } else {
	                // Start comments must always have a parent and at least one following sibling (the end comment)
	                containerNode.parentNode.insertBefore(nodeToPrepend, containerNode.nextSibling);
	            }
	        },
	
	        insertAfter: function(containerNode, nodeToInsert, insertAfterNode) {
	            if (!insertAfterNode) {
	                ko.virtualElements.prepend(containerNode, nodeToInsert);
	            } else if (!isStartComment(containerNode)) {
	                // Insert after insertion point
	                if (insertAfterNode.nextSibling)
	                    containerNode.insertBefore(nodeToInsert, insertAfterNode.nextSibling);
	                else
	                    containerNode.appendChild(nodeToInsert);
	            } else {
	                // Children of start comments must always have a parent and at least one following sibling (the end comment)
	                containerNode.parentNode.insertBefore(nodeToInsert, insertAfterNode.nextSibling);
	            }
	        },
	
	        firstChild: function(node) {
	            if (!isStartComment(node))
	                return node.firstChild;
	            if (!node.nextSibling || isEndComment(node.nextSibling))
	                return null;
	            return node.nextSibling;
	        },
	
	        nextSibling: function(node) {
	            if (isStartComment(node))
	                node = getMatchingEndComment(node);
	            if (node.nextSibling && isEndComment(node.nextSibling))
	                return null;
	            return node.nextSibling;
	        },
	
	        hasBindingValue: isStartComment,
	
	        virtualNodeBindingValue: function(node) {
	            var regexMatch = (commentNodesHaveTextProperty ? node.text : node.nodeValue).match(startCommentRegex);
	            return regexMatch ? regexMatch[1] : null;
	        },
	
	        normaliseVirtualElementDomStructure: function(elementVerified) {
	            // Workaround for https://github.com/SteveSanderson/knockout/issues/155
	            // (IE <= 8 or IE 9 quirks mode parses your HTML weirdly, treating closing </li> tags as if they don't exist, thereby moving comment nodes
	            // that are direct descendants of <ul> into the preceding <li>)
	            if (!htmlTagsWithOptionallyClosingChildren[ko.utils.tagNameLower(elementVerified)])
	                return;
	
	            // Scan immediate children to see if they contain unbalanced comment tags. If they do, those comment tags
	            // must be intended to appear *after* that child, so move them there.
	            var childNode = elementVerified.firstChild;
	            if (childNode) {
	                do {
	                    if (childNode.nodeType === 1) {
	                        var unbalancedTags = getUnbalancedChildTags(childNode);
	                        if (unbalancedTags) {
	                            // Fix up the DOM by moving the unbalanced tags to where they most likely were intended to be placed - *after* the child
	                            var nodeToInsertBefore = childNode.nextSibling;
	                            for (var i = 0; i < unbalancedTags.length; i++) {
	                                if (nodeToInsertBefore)
	                                    elementVerified.insertBefore(unbalancedTags[i], nodeToInsertBefore);
	                                else
	                                    elementVerified.appendChild(unbalancedTags[i]);
	                            }
	                        }
	                    }
	                } while (childNode = childNode.nextSibling);
	            }
	        }
	    };
	})();
	ko.exportSymbol('virtualElements', ko.virtualElements);
	ko.exportSymbol('virtualElements.allowedBindings', ko.virtualElements.allowedBindings);
	ko.exportSymbol('virtualElements.emptyNode', ko.virtualElements.emptyNode);
	//ko.exportSymbol('virtualElements.firstChild', ko.virtualElements.firstChild);     // firstChild is not minified
	ko.exportSymbol('virtualElements.insertAfter', ko.virtualElements.insertAfter);
	//ko.exportSymbol('virtualElements.nextSibling', ko.virtualElements.nextSibling);   // nextSibling is not minified
	ko.exportSymbol('virtualElements.prepend', ko.virtualElements.prepend);
	ko.exportSymbol('virtualElements.setDomNodeChildren', ko.virtualElements.setDomNodeChildren);
	(function() {
	    var defaultBindingAttributeName = "data-bind";
	
	    ko.bindingProvider = function() {
	        this.bindingCache = {};
	    };
	
	    ko.utils.extend(ko.bindingProvider.prototype, {
	        'nodeHasBindings': function(node) {
	            switch (node.nodeType) {
	                case 1: // Element
	                    return node.getAttribute(defaultBindingAttributeName) != null
	                        || ko.components['getComponentNameForNode'](node);
	                case 8: // Comment node
	                    return ko.virtualElements.hasBindingValue(node);
	                default: return false;
	            }
	        },
	
	        'getBindings': function(node, bindingContext) {
	            var bindingsString = this['getBindingsString'](node, bindingContext),
	                parsedBindings = bindingsString ? this['parseBindingsString'](bindingsString, bindingContext, node) : null;
	            return ko.components.addBindingsForCustomElement(parsedBindings, node, bindingContext, /* valueAccessors */ false);
	        },
	
	        'getBindingAccessors': function(node, bindingContext) {
	            var bindingsString = this['getBindingsString'](node, bindingContext),
	                parsedBindings = bindingsString ? this['parseBindingsString'](bindingsString, bindingContext, node, { 'valueAccessors': true }) : null;
	            return ko.components.addBindingsForCustomElement(parsedBindings, node, bindingContext, /* valueAccessors */ true);
	        },
	
	        // The following function is only used internally by this default provider.
	        // It's not part of the interface definition for a general binding provider.
	        'getBindingsString': function(node, bindingContext) {
	            switch (node.nodeType) {
	                case 1: return node.getAttribute(defaultBindingAttributeName);   // Element
	                case 8: return ko.virtualElements.virtualNodeBindingValue(node); // Comment node
	                default: return null;
	            }
	        },
	
	        // The following function is only used internally by this default provider.
	        // It's not part of the interface definition for a general binding provider.
	        'parseBindingsString': function(bindingsString, bindingContext, node, options) {
	            try {
	                var bindingFunction = createBindingsStringEvaluatorViaCache(bindingsString, this.bindingCache, options);
	                return bindingFunction(bindingContext, node);
	            } catch (ex) {
	                ex.message = "Unable to parse bindings.\nBindings value: " + bindingsString + "\nMessage: " + ex.message;
	                throw ex;
	            }
	        }
	    });
	
	    ko.bindingProvider['instance'] = new ko.bindingProvider();
	
	    function createBindingsStringEvaluatorViaCache(bindingsString, cache, options) {
	        var cacheKey = bindingsString + (options && options['valueAccessors'] || '');
	        return cache[cacheKey]
	            || (cache[cacheKey] = createBindingsStringEvaluator(bindingsString, options));
	    }
	
	    function createBindingsStringEvaluator(bindingsString, options) {
	        // Build the source for a function that evaluates "expression"
	        // For each scope variable, add an extra level of "with" nesting
	        // Example result: with(sc1) { with(sc0) { return (expression) } }
	        var rewrittenBindings = ko.expressionRewriting.preProcessBindings(bindingsString, options),
	            functionBody = "with($context){with($data||{}){return{" + rewrittenBindings + "}}}";
	        return new Function("$context", "$element", functionBody);
	    }
	})();
	
	ko.exportSymbol('bindingProvider', ko.bindingProvider);
	(function () {
	    ko.bindingHandlers = {};
	
	    // The following element types will not be recursed into during binding.
	    var bindingDoesNotRecurseIntoElementTypes = {
	        // Don't want bindings that operate on text nodes to mutate <script> and <textarea> contents,
	        // because it's unexpected and a potential XSS issue.
	        // Also bindings should not operate on <template> elements since this breaks in Internet Explorer
	        // and because such elements' contents are always intended to be bound in a different context
	        // from where they appear in the document.
	        'script': true,
	        'textarea': true,
	        'template': true
	    };
	
	    // Use an overridable method for retrieving binding handlers so that a plugins may support dynamically created handlers
	    ko['getBindingHandler'] = function(bindingKey) {
	        return ko.bindingHandlers[bindingKey];
	    };
	
	    // The ko.bindingContext constructor is only called directly to create the root context. For child
	    // contexts, use bindingContext.createChildContext or bindingContext.extend.
	    ko.bindingContext = function(dataItemOrAccessor, parentContext, dataItemAlias, extendCallback, options) {
	
	        // The binding context object includes static properties for the current, parent, and root view models.
	        // If a view model is actually stored in an observable, the corresponding binding context object, and
	        // any child contexts, must be updated when the view model is changed.
	        function updateContext() {
	            // Most of the time, the context will directly get a view model object, but if a function is given,
	            // we call the function to retrieve the view model. If the function accesses any observables or returns
	            // an observable, the dependency is tracked, and those observables can later cause the binding
	            // context to be updated.
	            var dataItemOrObservable = isFunc ? dataItemOrAccessor() : dataItemOrAccessor,
	                dataItem = ko.utils.unwrapObservable(dataItemOrObservable);
	
	            if (parentContext) {
	                // When a "parent" context is given, register a dependency on the parent context. Thus whenever the
	                // parent context is updated, this context will also be updated.
	                if (parentContext._subscribable)
	                    parentContext._subscribable();
	
	                // Copy $root and any custom properties from the parent context
	                ko.utils.extend(self, parentContext);
	
	                // Because the above copy overwrites our own properties, we need to reset them.
	                self._subscribable = subscribable;
	            } else {
	                self['$parents'] = [];
	                self['$root'] = dataItem;
	
	                // Export 'ko' in the binding context so it will be available in bindings and templates
	                // even if 'ko' isn't exported as a global, such as when using an AMD loader.
	                // See https://github.com/SteveSanderson/knockout/issues/490
	                self['ko'] = ko;
	            }
	            self['$rawData'] = dataItemOrObservable;
	            self['$data'] = dataItem;
	            if (dataItemAlias)
	                self[dataItemAlias] = dataItem;
	
	            // The extendCallback function is provided when creating a child context or extending a context.
	            // It handles the specific actions needed to finish setting up the binding context. Actions in this
	            // function could also add dependencies to this binding context.
	            if (extendCallback)
	                extendCallback(self, parentContext, dataItem);
	
	            return self['$data'];
	        }
	        function disposeWhen() {
	            return nodes && !ko.utils.anyDomNodeIsAttachedToDocument(nodes);
	        }
	
	        var self = this,
	            isFunc = typeof(dataItemOrAccessor) == "function" && !ko.isObservable(dataItemOrAccessor),
	            nodes,
	            subscribable;
	
	        if (options && options['exportDependencies']) {
	            // The "exportDependencies" option means that the calling code will track any dependencies and re-create
	            // the binding context when they change.
	            updateContext();
	        } else {
	            subscribable = ko.dependentObservable(updateContext, null, { disposeWhen: disposeWhen, disposeWhenNodeIsRemoved: true });
	
	            // At this point, the binding context has been initialized, and the "subscribable" computed observable is
	            // subscribed to any observables that were accessed in the process. If there is nothing to track, the
	            // computed will be inactive, and we can safely throw it away. If it's active, the computed is stored in
	            // the context object.
	            if (subscribable.isActive()) {
	                self._subscribable = subscribable;
	
	                // Always notify because even if the model ($data) hasn't changed, other context properties might have changed
	                subscribable['equalityComparer'] = null;
	
	                // We need to be able to dispose of this computed observable when it's no longer needed. This would be
	                // easy if we had a single node to watch, but binding contexts can be used by many different nodes, and
	                // we cannot assume that those nodes have any relation to each other. So instead we track any node that
	                // the context is attached to, and dispose the computed when all of those nodes have been cleaned.
	
	                // Add properties to *subscribable* instead of *self* because any properties added to *self* may be overwritten on updates
	                nodes = [];
	                subscribable._addNode = function(node) {
	                    nodes.push(node);
	                    ko.utils.domNodeDisposal.addDisposeCallback(node, function(node) {
	                        ko.utils.arrayRemoveItem(nodes, node);
	                        if (!nodes.length) {
	                            subscribable.dispose();
	                            self._subscribable = subscribable = undefined;
	                        }
	                    });
	                };
	            }
	        }
	    }
	
	    // Extend the binding context hierarchy with a new view model object. If the parent context is watching
	    // any observables, the new child context will automatically get a dependency on the parent context.
	    // But this does not mean that the $data value of the child context will also get updated. If the child
	    // view model also depends on the parent view model, you must provide a function that returns the correct
	    // view model on each update.
	    ko.bindingContext.prototype['createChildContext'] = function (dataItemOrAccessor, dataItemAlias, extendCallback, options) {
	        return new ko.bindingContext(dataItemOrAccessor, this, dataItemAlias, function(self, parentContext) {
	            // Extend the context hierarchy by setting the appropriate pointers
	            self['$parentContext'] = parentContext;
	            self['$parent'] = parentContext['$data'];
	            self['$parents'] = (parentContext['$parents'] || []).slice(0);
	            self['$parents'].unshift(self['$parent']);
	            if (extendCallback)
	                extendCallback(self);
	        }, options);
	    };
	
	    // Extend the binding context with new custom properties. This doesn't change the context hierarchy.
	    // Similarly to "child" contexts, provide a function here to make sure that the correct values are set
	    // when an observable view model is updated.
	    ko.bindingContext.prototype['extend'] = function(properties) {
	        // If the parent context references an observable view model, "_subscribable" will always be the
	        // latest view model object. If not, "_subscribable" isn't set, and we can use the static "$data" value.
	        return new ko.bindingContext(this._subscribable || this['$data'], this, null, function(self, parentContext) {
	            // This "child" context doesn't directly track a parent observable view model,
	            // so we need to manually set the $rawData value to match the parent.
	            self['$rawData'] = parentContext['$rawData'];
	            ko.utils.extend(self, typeof(properties) == "function" ? properties() : properties);
	        });
	    };
	
	    ko.bindingContext.prototype.createStaticChildContext = function (dataItemOrAccessor, dataItemAlias) {
	        return this['createChildContext'](dataItemOrAccessor, dataItemAlias, null, { "exportDependencies": true });
	    };
	
	    // Returns the valueAccesor function for a binding value
	    function makeValueAccessor(value) {
	        return function() {
	            return value;
	        };
	    }
	
	    // Returns the value of a valueAccessor function
	    function evaluateValueAccessor(valueAccessor) {
	        return valueAccessor();
	    }
	
	    // Given a function that returns bindings, create and return a new object that contains
	    // binding value-accessors functions. Each accessor function calls the original function
	    // so that it always gets the latest value and all dependencies are captured. This is used
	    // by ko.applyBindingsToNode and getBindingsAndMakeAccessors.
	    function makeAccessorsFromFunction(callback) {
	        return ko.utils.objectMap(ko.dependencyDetection.ignore(callback), function(value, key) {
	            return function() {
	                return callback()[key];
	            };
	        });
	    }
	
	    // Given a bindings function or object, create and return a new object that contains
	    // binding value-accessors functions. This is used by ko.applyBindingsToNode.
	    function makeBindingAccessors(bindings, context, node) {
	        if (typeof bindings === 'function') {
	            return makeAccessorsFromFunction(bindings.bind(null, context, node));
	        } else {
	            return ko.utils.objectMap(bindings, makeValueAccessor);
	        }
	    }
	
	    // This function is used if the binding provider doesn't include a getBindingAccessors function.
	    // It must be called with 'this' set to the provider instance.
	    function getBindingsAndMakeAccessors(node, context) {
	        return makeAccessorsFromFunction(this['getBindings'].bind(this, node, context));
	    }
	
	    function validateThatBindingIsAllowedForVirtualElements(bindingName) {
	        var validator = ko.virtualElements.allowedBindings[bindingName];
	        if (!validator)
	            throw new Error("The binding '" + bindingName + "' cannot be used with virtual elements")
	    }
	
	    function applyBindingsToDescendantsInternal (bindingContext, elementOrVirtualElement, bindingContextsMayDifferFromDomParentElement) {
	        var currentChild,
	            nextInQueue = ko.virtualElements.firstChild(elementOrVirtualElement),
	            provider = ko.bindingProvider['instance'],
	            preprocessNode = provider['preprocessNode'];
	
	        // Preprocessing allows a binding provider to mutate a node before bindings are applied to it. For example it's
	        // possible to insert new siblings after it, and/or replace the node with a different one. This can be used to
	        // implement custom binding syntaxes, such as {{ value }} for string interpolation, or custom element types that
	        // trigger insertion of <template> contents at that point in the document.
	        if (preprocessNode) {
	            while (currentChild = nextInQueue) {
	                nextInQueue = ko.virtualElements.nextSibling(currentChild);
	                preprocessNode.call(provider, currentChild);
	            }
	            // Reset nextInQueue for the next loop
	            nextInQueue = ko.virtualElements.firstChild(elementOrVirtualElement);
	        }
	
	        while (currentChild = nextInQueue) {
	            // Keep a record of the next child *before* applying bindings, in case the binding removes the current child from its position
	            nextInQueue = ko.virtualElements.nextSibling(currentChild);
	            applyBindingsToNodeAndDescendantsInternal(bindingContext, currentChild, bindingContextsMayDifferFromDomParentElement);
	        }
	    }
	
	    function applyBindingsToNodeAndDescendantsInternal (bindingContext, nodeVerified, bindingContextMayDifferFromDomParentElement) {
	        var shouldBindDescendants = true;
	
	        // Perf optimisation: Apply bindings only if...
	        // (1) We need to store the binding context on this node (because it may differ from the DOM parent node's binding context)
	        //     Note that we can't store binding contexts on non-elements (e.g., text nodes), as IE doesn't allow expando properties for those
	        // (2) It might have bindings (e.g., it has a data-bind attribute, or it's a marker for a containerless template)
	        var isElement = (nodeVerified.nodeType === 1);
	        if (isElement) // Workaround IE <= 8 HTML parsing weirdness
	            ko.virtualElements.normaliseVirtualElementDomStructure(nodeVerified);
	
	        var shouldApplyBindings = (isElement && bindingContextMayDifferFromDomParentElement)             // Case (1)
	                               || ko.bindingProvider['instance']['nodeHasBindings'](nodeVerified);       // Case (2)
	        if (shouldApplyBindings)
	            shouldBindDescendants = applyBindingsToNodeInternal(nodeVerified, null, bindingContext, bindingContextMayDifferFromDomParentElement)['shouldBindDescendants'];
	
	        if (shouldBindDescendants && !bindingDoesNotRecurseIntoElementTypes[ko.utils.tagNameLower(nodeVerified)]) {
	            // We're recursing automatically into (real or virtual) child nodes without changing binding contexts. So,
	            //  * For children of a *real* element, the binding context is certainly the same as on their DOM .parentNode,
	            //    hence bindingContextsMayDifferFromDomParentElement is false
	            //  * For children of a *virtual* element, we can't be sure. Evaluating .parentNode on those children may
	            //    skip over any number of intermediate virtual elements, any of which might define a custom binding context,
	            //    hence bindingContextsMayDifferFromDomParentElement is true
	            applyBindingsToDescendantsInternal(bindingContext, nodeVerified, /* bindingContextsMayDifferFromDomParentElement: */ !isElement);
	        }
	    }
	
	    var boundElementDomDataKey = ko.utils.domData.nextKey();
	
	
	    function topologicalSortBindings(bindings) {
	        // Depth-first sort
	        var result = [],                // The list of key/handler pairs that we will return
	            bindingsConsidered = {},    // A temporary record of which bindings are already in 'result'
	            cyclicDependencyStack = []; // Keeps track of a depth-search so that, if there's a cycle, we know which bindings caused it
	        ko.utils.objectForEach(bindings, function pushBinding(bindingKey) {
	            if (!bindingsConsidered[bindingKey]) {
	                var binding = ko['getBindingHandler'](bindingKey);
	                if (binding) {
	                    // First add dependencies (if any) of the current binding
	                    if (binding['after']) {
	                        cyclicDependencyStack.push(bindingKey);
	                        ko.utils.arrayForEach(binding['after'], function(bindingDependencyKey) {
	                            if (bindings[bindingDependencyKey]) {
	                                if (ko.utils.arrayIndexOf(cyclicDependencyStack, bindingDependencyKey) !== -1) {
	                                    throw Error("Cannot combine the following bindings, because they have a cyclic dependency: " + cyclicDependencyStack.join(", "));
	                                } else {
	                                    pushBinding(bindingDependencyKey);
	                                }
	                            }
	                        });
	                        cyclicDependencyStack.length--;
	                    }
	                    // Next add the current binding
	                    result.push({ key: bindingKey, handler: binding });
	                }
	                bindingsConsidered[bindingKey] = true;
	            }
	        });
	
	        return result;
	    }
	
	    function applyBindingsToNodeInternal(node, sourceBindings, bindingContext, bindingContextMayDifferFromDomParentElement) {
	        // Prevent multiple applyBindings calls for the same node, except when a binding value is specified
	        var alreadyBound = ko.utils.domData.get(node, boundElementDomDataKey);
	        if (!sourceBindings) {
	            if (alreadyBound) {
	                throw Error("You cannot apply bindings multiple times to the same element.");
	            }
	            ko.utils.domData.set(node, boundElementDomDataKey, true);
	        }
	
	        // Optimization: Don't store the binding context on this node if it's definitely the same as on node.parentNode, because
	        // we can easily recover it just by scanning up the node's ancestors in the DOM
	        // (note: here, parent node means "real DOM parent" not "virtual parent", as there's no O(1) way to find the virtual parent)
	        if (!alreadyBound && bindingContextMayDifferFromDomParentElement)
	            ko.storedBindingContextForNode(node, bindingContext);
	
	        // Use bindings if given, otherwise fall back on asking the bindings provider to give us some bindings
	        var bindings;
	        if (sourceBindings && typeof sourceBindings !== 'function') {
	            bindings = sourceBindings;
	        } else {
	            var provider = ko.bindingProvider['instance'],
	                getBindings = provider['getBindingAccessors'] || getBindingsAndMakeAccessors;
	
	            // Get the binding from the provider within a computed observable so that we can update the bindings whenever
	            // the binding context is updated or if the binding provider accesses observables.
	            var bindingsUpdater = ko.dependentObservable(
	                function() {
	                    bindings = sourceBindings ? sourceBindings(bindingContext, node) : getBindings.call(provider, node, bindingContext);
	                    // Register a dependency on the binding context to support observable view models.
	                    if (bindings && bindingContext._subscribable)
	                        bindingContext._subscribable();
	                    return bindings;
	                },
	                null, { disposeWhenNodeIsRemoved: node }
	            );
	
	            if (!bindings || !bindingsUpdater.isActive())
	                bindingsUpdater = null;
	        }
	
	        var bindingHandlerThatControlsDescendantBindings;
	        if (bindings) {
	            // Return the value accessor for a given binding. When bindings are static (won't be updated because of a binding
	            // context update), just return the value accessor from the binding. Otherwise, return a function that always gets
	            // the latest binding value and registers a dependency on the binding updater.
	            var getValueAccessor = bindingsUpdater
	                ? function(bindingKey) {
	                    return function() {
	                        return evaluateValueAccessor(bindingsUpdater()[bindingKey]);
	                    };
	                } : function(bindingKey) {
	                    return bindings[bindingKey];
	                };
	
	            // Use of allBindings as a function is maintained for backwards compatibility, but its use is deprecated
	            function allBindings() {
	                return ko.utils.objectMap(bindingsUpdater ? bindingsUpdater() : bindings, evaluateValueAccessor);
	            }
	            // The following is the 3.x allBindings API
	            allBindings['get'] = function(key) {
	                return bindings[key] && evaluateValueAccessor(getValueAccessor(key));
	            };
	            allBindings['has'] = function(key) {
	                return key in bindings;
	            };
	
	            // First put the bindings into the right order
	            var orderedBindings = topologicalSortBindings(bindings);
	
	            // Go through the sorted bindings, calling init and update for each
	            ko.utils.arrayForEach(orderedBindings, function(bindingKeyAndHandler) {
	                // Note that topologicalSortBindings has already filtered out any nonexistent binding handlers,
	                // so bindingKeyAndHandler.handler will always be nonnull.
	                var handlerInitFn = bindingKeyAndHandler.handler["init"],
	                    handlerUpdateFn = bindingKeyAndHandler.handler["update"],
	                    bindingKey = bindingKeyAndHandler.key;
	
	                if (node.nodeType === 8) {
	                    validateThatBindingIsAllowedForVirtualElements(bindingKey);
	                }
	
	                try {
	                    // Run init, ignoring any dependencies
	                    if (typeof handlerInitFn == "function") {
	                        ko.dependencyDetection.ignore(function() {
	                            var initResult = handlerInitFn(node, getValueAccessor(bindingKey), allBindings, bindingContext['$data'], bindingContext);
	
	                            // If this binding handler claims to control descendant bindings, make a note of this
	                            if (initResult && initResult['controlsDescendantBindings']) {
	                                if (bindingHandlerThatControlsDescendantBindings !== undefined)
	                                    throw new Error("Multiple bindings (" + bindingHandlerThatControlsDescendantBindings + " and " + bindingKey + ") are trying to control descendant bindings of the same element. You cannot use these bindings together on the same element.");
	                                bindingHandlerThatControlsDescendantBindings = bindingKey;
	                            }
	                        });
	                    }
	
	                    // Run update in its own computed wrapper
	                    if (typeof handlerUpdateFn == "function") {
	                        ko.dependentObservable(
	                            function() {
	                                handlerUpdateFn(node, getValueAccessor(bindingKey), allBindings, bindingContext['$data'], bindingContext);
	                            },
	                            null,
	                            { disposeWhenNodeIsRemoved: node }
	                        );
	                    }
	                } catch (ex) {
	                    ex.message = "Unable to process binding \"" + bindingKey + ": " + bindings[bindingKey] + "\"\nMessage: " + ex.message;
	                    throw ex;
	                }
	            });
	        }
	
	        return {
	            'shouldBindDescendants': bindingHandlerThatControlsDescendantBindings === undefined
	        };
	    };
	
	    var storedBindingContextDomDataKey = ko.utils.domData.nextKey();
	    ko.storedBindingContextForNode = function (node, bindingContext) {
	        if (arguments.length == 2) {
	            ko.utils.domData.set(node, storedBindingContextDomDataKey, bindingContext);
	            if (bindingContext._subscribable)
	                bindingContext._subscribable._addNode(node);
	        } else {
	            return ko.utils.domData.get(node, storedBindingContextDomDataKey);
	        }
	    }
	
	    function getBindingContext(viewModelOrBindingContext) {
	        return viewModelOrBindingContext && (viewModelOrBindingContext instanceof ko.bindingContext)
	            ? viewModelOrBindingContext
	            : new ko.bindingContext(viewModelOrBindingContext);
	    }
	
	    ko.applyBindingAccessorsToNode = function (node, bindings, viewModelOrBindingContext) {
	        if (node.nodeType === 1) // If it's an element, workaround IE <= 8 HTML parsing weirdness
	            ko.virtualElements.normaliseVirtualElementDomStructure(node);
	        return applyBindingsToNodeInternal(node, bindings, getBindingContext(viewModelOrBindingContext), true);
	    };
	
	    ko.applyBindingsToNode = function (node, bindings, viewModelOrBindingContext) {
	        var context = getBindingContext(viewModelOrBindingContext);
	        return ko.applyBindingAccessorsToNode(node, makeBindingAccessors(bindings, context, node), context);
	    };
	
	    ko.applyBindingsToDescendants = function(viewModelOrBindingContext, rootNode) {
	        if (rootNode.nodeType === 1 || rootNode.nodeType === 8)
	            applyBindingsToDescendantsInternal(getBindingContext(viewModelOrBindingContext), rootNode, true);
	    };
	
	    ko.applyBindings = function (viewModelOrBindingContext, rootNode) {
	        // If jQuery is loaded after Knockout, we won't initially have access to it. So save it here.
	        if (!jQueryInstance && window['jQuery']) {
	            jQueryInstance = window['jQuery'];
	        }
	
	        if (rootNode && (rootNode.nodeType !== 1) && (rootNode.nodeType !== 8))
	            throw new Error("ko.applyBindings: first parameter should be your view model; second parameter should be a DOM node");
	        rootNode = rootNode || window.document.body; // Make "rootNode" parameter optional
	
	        applyBindingsToNodeAndDescendantsInternal(getBindingContext(viewModelOrBindingContext), rootNode, true);
	    };
	
	    // Retrieving binding context from arbitrary nodes
	    ko.contextFor = function(node) {
	        // We can only do something meaningful for elements and comment nodes (in particular, not text nodes, as IE can't store domdata for them)
	        switch (node.nodeType) {
	            case 1:
	            case 8:
	                var context = ko.storedBindingContextForNode(node);
	                if (context) return context;
	                if (node.parentNode) return ko.contextFor(node.parentNode);
	                break;
	        }
	        return undefined;
	    };
	    ko.dataFor = function(node) {
	        var context = ko.contextFor(node);
	        return context ? context['$data'] : undefined;
	    };
	
	    ko.exportSymbol('bindingHandlers', ko.bindingHandlers);
	    ko.exportSymbol('applyBindings', ko.applyBindings);
	    ko.exportSymbol('applyBindingsToDescendants', ko.applyBindingsToDescendants);
	    ko.exportSymbol('applyBindingAccessorsToNode', ko.applyBindingAccessorsToNode);
	    ko.exportSymbol('applyBindingsToNode', ko.applyBindingsToNode);
	    ko.exportSymbol('contextFor', ko.contextFor);
	    ko.exportSymbol('dataFor', ko.dataFor);
	})();
	(function(undefined) {
	    var loadingSubscribablesCache = {}, // Tracks component loads that are currently in flight
	        loadedDefinitionsCache = {};    // Tracks component loads that have already completed
	
	    ko.components = {
	        get: function(componentName, callback) {
	            var cachedDefinition = getObjectOwnProperty(loadedDefinitionsCache, componentName);
	            if (cachedDefinition) {
	                // It's already loaded and cached. Reuse the same definition object.
	                // Note that for API consistency, even cache hits complete asynchronously by default.
	                // You can bypass this by putting synchronous:true on your component config.
	                if (cachedDefinition.isSynchronousComponent) {
	                    ko.dependencyDetection.ignore(function() { // See comment in loaderRegistryBehaviors.js for reasoning
	                        callback(cachedDefinition.definition);
	                    });
	                } else {
	                    ko.tasks.schedule(function() { callback(cachedDefinition.definition); });
	                }
	            } else {
	                // Join the loading process that is already underway, or start a new one.
	                loadComponentAndNotify(componentName, callback);
	            }
	        },
	
	        clearCachedDefinition: function(componentName) {
	            delete loadedDefinitionsCache[componentName];
	        },
	
	        _getFirstResultFromLoaders: getFirstResultFromLoaders
	    };
	
	    function getObjectOwnProperty(obj, propName) {
	        return obj.hasOwnProperty(propName) ? obj[propName] : undefined;
	    }
	
	    function loadComponentAndNotify(componentName, callback) {
	        var subscribable = getObjectOwnProperty(loadingSubscribablesCache, componentName),
	            completedAsync;
	        if (!subscribable) {
	            // It's not started loading yet. Start loading, and when it's done, move it to loadedDefinitionsCache.
	            subscribable = loadingSubscribablesCache[componentName] = new ko.subscribable();
	            subscribable.subscribe(callback);
	
	            beginLoadingComponent(componentName, function(definition, config) {
	                var isSynchronousComponent = !!(config && config['synchronous']);
	                loadedDefinitionsCache[componentName] = { definition: definition, isSynchronousComponent: isSynchronousComponent };
	                delete loadingSubscribablesCache[componentName];
	
	                // For API consistency, all loads complete asynchronously. However we want to avoid
	                // adding an extra task schedule if it's unnecessary (i.e., the completion is already
	                // async).
	                //
	                // You can bypass the 'always asynchronous' feature by putting the synchronous:true
	                // flag on your component configuration when you register it.
	                if (completedAsync || isSynchronousComponent) {
	                    // Note that notifySubscribers ignores any dependencies read within the callback.
	                    // See comment in loaderRegistryBehaviors.js for reasoning
	                    subscribable['notifySubscribers'](definition);
	                } else {
	                    ko.tasks.schedule(function() {
	                        subscribable['notifySubscribers'](definition);
	                    });
	                }
	            });
	            completedAsync = true;
	        } else {
	            subscribable.subscribe(callback);
	        }
	    }
	
	    function beginLoadingComponent(componentName, callback) {
	        getFirstResultFromLoaders('getConfig', [componentName], function(config) {
	            if (config) {
	                // We have a config, so now load its definition
	                getFirstResultFromLoaders('loadComponent', [componentName, config], function(definition) {
	                    callback(definition, config);
	                });
	            } else {
	                // The component has no config - it's unknown to all the loaders.
	                // Note that this is not an error (e.g., a module loading error) - that would abort the
	                // process and this callback would not run. For this callback to run, all loaders must
	                // have confirmed they don't know about this component.
	                callback(null, null);
	            }
	        });
	    }
	
	    function getFirstResultFromLoaders(methodName, argsExceptCallback, callback, candidateLoaders) {
	        // On the first call in the stack, start with the full set of loaders
	        if (!candidateLoaders) {
	            candidateLoaders = ko.components['loaders'].slice(0); // Use a copy, because we'll be mutating this array
	        }
	
	        // Try the next candidate
	        var currentCandidateLoader = candidateLoaders.shift();
	        if (currentCandidateLoader) {
	            var methodInstance = currentCandidateLoader[methodName];
	            if (methodInstance) {
	                var wasAborted = false,
	                    synchronousReturnValue = methodInstance.apply(currentCandidateLoader, argsExceptCallback.concat(function(result) {
	                        if (wasAborted) {
	                            callback(null);
	                        } else if (result !== null) {
	                            // This candidate returned a value. Use it.
	                            callback(result);
	                        } else {
	                            // Try the next candidate
	                            getFirstResultFromLoaders(methodName, argsExceptCallback, callback, candidateLoaders);
	                        }
	                    }));
	
	                // Currently, loaders may not return anything synchronously. This leaves open the possibility
	                // that we'll extend the API to support synchronous return values in the future. It won't be
	                // a breaking change, because currently no loader is allowed to return anything except undefined.
	                if (synchronousReturnValue !== undefined) {
	                    wasAborted = true;
	
	                    // Method to suppress exceptions will remain undocumented. This is only to keep
	                    // KO's specs running tidily, since we can observe the loading got aborted without
	                    // having exceptions cluttering up the console too.
	                    if (!currentCandidateLoader['suppressLoaderExceptions']) {
	                        throw new Error('Component loaders must supply values by invoking the callback, not by returning values synchronously.');
	                    }
	                }
	            } else {
	                // This candidate doesn't have the relevant handler. Synchronously move on to the next one.
	                getFirstResultFromLoaders(methodName, argsExceptCallback, callback, candidateLoaders);
	            }
	        } else {
	            // No candidates returned a value
	            callback(null);
	        }
	    }
	
	    // Reference the loaders via string name so it's possible for developers
	    // to replace the whole array by assigning to ko.components.loaders
	    ko.components['loaders'] = [];
	
	    ko.exportSymbol('components', ko.components);
	    ko.exportSymbol('components.get', ko.components.get);
	    ko.exportSymbol('components.clearCachedDefinition', ko.components.clearCachedDefinition);
	})();
	(function(undefined) {
	
	    // The default loader is responsible for two things:
	    // 1. Maintaining the default in-memory registry of component configuration objects
	    //    (i.e., the thing you're writing to when you call ko.components.register(someName, ...))
	    // 2. Answering requests for components by fetching configuration objects
	    //    from that default in-memory registry and resolving them into standard
	    //    component definition objects (of the form { createViewModel: ..., template: ... })
	    // Custom loaders may override either of these facilities, i.e.,
	    // 1. To supply configuration objects from some other source (e.g., conventions)
	    // 2. Or, to resolve configuration objects by loading viewmodels/templates via arbitrary logic.
	
	    var defaultConfigRegistry = {};
	
	    ko.components.register = function(componentName, config) {
	        if (!config) {
	            throw new Error('Invalid configuration for ' + componentName);
	        }
	
	        if (ko.components.isRegistered(componentName)) {
	            throw new Error('Component ' + componentName + ' is already registered');
	        }
	
	        defaultConfigRegistry[componentName] = config;
	    };
	
	    ko.components.isRegistered = function(componentName) {
	        return defaultConfigRegistry.hasOwnProperty(componentName);
	    };
	
	    ko.components.unregister = function(componentName) {
	        delete defaultConfigRegistry[componentName];
	        ko.components.clearCachedDefinition(componentName);
	    };
	
	    ko.components.defaultLoader = {
	        'getConfig': function(componentName, callback) {
	            var result = defaultConfigRegistry.hasOwnProperty(componentName)
	                ? defaultConfigRegistry[componentName]
	                : null;
	            callback(result);
	        },
	
	        'loadComponent': function(componentName, config, callback) {
	            var errorCallback = makeErrorCallback(componentName);
	            possiblyGetConfigFromAmd(errorCallback, config, function(loadedConfig) {
	                resolveConfig(componentName, errorCallback, loadedConfig, callback);
	            });
	        },
	
	        'loadTemplate': function(componentName, templateConfig, callback) {
	            resolveTemplate(makeErrorCallback(componentName), templateConfig, callback);
	        },
	
	        'loadViewModel': function(componentName, viewModelConfig, callback) {
	            resolveViewModel(makeErrorCallback(componentName), viewModelConfig, callback);
	        }
	    };
	
	    var createViewModelKey = 'createViewModel';
	
	    // Takes a config object of the form { template: ..., viewModel: ... }, and asynchronously convert it
	    // into the standard component definition format:
	    //    { template: <ArrayOfDomNodes>, createViewModel: function(params, componentInfo) { ... } }.
	    // Since both template and viewModel may need to be resolved asynchronously, both tasks are performed
	    // in parallel, and the results joined when both are ready. We don't depend on any promises infrastructure,
	    // so this is implemented manually below.
	    function resolveConfig(componentName, errorCallback, config, callback) {
	        var result = {},
	            makeCallBackWhenZero = 2,
	            tryIssueCallback = function() {
	                if (--makeCallBackWhenZero === 0) {
	                    callback(result);
	                }
	            },
	            templateConfig = config['template'],
	            viewModelConfig = config['viewModel'];
	
	        if (templateConfig) {
	            possiblyGetConfigFromAmd(errorCallback, templateConfig, function(loadedConfig) {
	                ko.components._getFirstResultFromLoaders('loadTemplate', [componentName, loadedConfig], function(resolvedTemplate) {
	                    result['template'] = resolvedTemplate;
	                    tryIssueCallback();
	                });
	            });
	        } else {
	            tryIssueCallback();
	        }
	
	        if (viewModelConfig) {
	            possiblyGetConfigFromAmd(errorCallback, viewModelConfig, function(loadedConfig) {
	                ko.components._getFirstResultFromLoaders('loadViewModel', [componentName, loadedConfig], function(resolvedViewModel) {
	                    result[createViewModelKey] = resolvedViewModel;
	                    tryIssueCallback();
	                });
	            });
	        } else {
	            tryIssueCallback();
	        }
	    }
	
	    function resolveTemplate(errorCallback, templateConfig, callback) {
	        if (typeof templateConfig === 'string') {
	            // Markup - parse it
	            callback(ko.utils.parseHtmlFragment(templateConfig));
	        } else if (templateConfig instanceof Array) {
	            // Assume already an array of DOM nodes - pass through unchanged
	            callback(templateConfig);
	        } else if (isDocumentFragment(templateConfig)) {
	            // Document fragment - use its child nodes
	            callback(ko.utils.makeArray(templateConfig.childNodes));
	        } else if (templateConfig['element']) {
	            var element = templateConfig['element'];
	            if (isDomElement(element)) {
	                // Element instance - copy its child nodes
	                callback(cloneNodesFromTemplateSourceElement(element));
	            } else if (typeof element === 'string') {
	                // Element ID - find it, then copy its child nodes
	                var elemInstance = document.getElementById(element);
	                if (elemInstance) {
	                    callback(cloneNodesFromTemplateSourceElement(elemInstance));
	                } else {
	                    errorCallback('Cannot find element with ID ' + element);
	                }
	            } else {
	                errorCallback('Unknown element type: ' + element);
	            }
	        } else {
	            errorCallback('Unknown template value: ' + templateConfig);
	        }
	    }
	
	    function resolveViewModel(errorCallback, viewModelConfig, callback) {
	        if (typeof viewModelConfig === 'function') {
	            // Constructor - convert to standard factory function format
	            // By design, this does *not* supply componentInfo to the constructor, as the intent is that
	            // componentInfo contains non-viewmodel data (e.g., the component's element) that should only
	            // be used in factory functions, not viewmodel constructors.
	            callback(function (params /*, componentInfo */) {
	                return new viewModelConfig(params);
	            });
	        } else if (typeof viewModelConfig[createViewModelKey] === 'function') {
	            // Already a factory function - use it as-is
	            callback(viewModelConfig[createViewModelKey]);
	        } else if ('instance' in viewModelConfig) {
	            // Fixed object instance - promote to createViewModel format for API consistency
	            var fixedInstance = viewModelConfig['instance'];
	            callback(function (params, componentInfo) {
	                return fixedInstance;
	            });
	        } else if ('viewModel' in viewModelConfig) {
	            // Resolved AMD module whose value is of the form { viewModel: ... }
	            resolveViewModel(errorCallback, viewModelConfig['viewModel'], callback);
	        } else {
	            errorCallback('Unknown viewModel value: ' + viewModelConfig);
	        }
	    }
	
	    function cloneNodesFromTemplateSourceElement(elemInstance) {
	        switch (ko.utils.tagNameLower(elemInstance)) {
	            case 'script':
	                return ko.utils.parseHtmlFragment(elemInstance.text);
	            case 'textarea':
	                return ko.utils.parseHtmlFragment(elemInstance.value);
	            case 'template':
	                // For browsers with proper <template> element support (i.e., where the .content property
	                // gives a document fragment), use that document fragment.
	                if (isDocumentFragment(elemInstance.content)) {
	                    return ko.utils.cloneNodes(elemInstance.content.childNodes);
	                }
	        }
	
	        // Regular elements such as <div>, and <template> elements on old browsers that don't really
	        // understand <template> and just treat it as a regular container
	        return ko.utils.cloneNodes(elemInstance.childNodes);
	    }
	
	    function isDomElement(obj) {
	        if (window['HTMLElement']) {
	            return obj instanceof HTMLElement;
	        } else {
	            return obj && obj.tagName && obj.nodeType === 1;
	        }
	    }
	
	    function isDocumentFragment(obj) {
	        if (window['DocumentFragment']) {
	            return obj instanceof DocumentFragment;
	        } else {
	            return obj && obj.nodeType === 11;
	        }
	    }
	
	    function possiblyGetConfigFromAmd(errorCallback, config, callback) {
	        if (typeof config['require'] === 'string') {
	            // The config is the value of an AMD module
	            if (amdRequire || window['require']) {
	                (amdRequire || window['require'])([config['require']], callback);
	            } else {
	                errorCallback('Uses require, but no AMD loader is present');
	            }
	        } else {
	            callback(config);
	        }
	    }
	
	    function makeErrorCallback(componentName) {
	        return function (message) {
	            throw new Error('Component \'' + componentName + '\': ' + message);
	        };
	    }
	
	    ko.exportSymbol('components.register', ko.components.register);
	    ko.exportSymbol('components.isRegistered', ko.components.isRegistered);
	    ko.exportSymbol('components.unregister', ko.components.unregister);
	
	    // Expose the default loader so that developers can directly ask it for configuration
	    // or to resolve configuration
	    ko.exportSymbol('components.defaultLoader', ko.components.defaultLoader);
	
	    // By default, the default loader is the only registered component loader
	    ko.components['loaders'].push(ko.components.defaultLoader);
	
	    // Privately expose the underlying config registry for use in old-IE shim
	    ko.components._allRegisteredComponents = defaultConfigRegistry;
	})();
	(function (undefined) {
	    // Overridable API for determining which component name applies to a given node. By overriding this,
	    // you can for example map specific tagNames to components that are not preregistered.
	    ko.components['getComponentNameForNode'] = function(node) {
	        var tagNameLower = ko.utils.tagNameLower(node);
	        if (ko.components.isRegistered(tagNameLower)) {
	            // Try to determine that this node can be considered a *custom* element; see https://github.com/knockout/knockout/issues/1603
	            if (tagNameLower.indexOf('-') != -1 || ('' + node) == "[object HTMLUnknownElement]" || (ko.utils.ieVersion <= 8 && node.tagName === tagNameLower)) {
	                return tagNameLower;
	            }
	        }
	    };
	
	    ko.components.addBindingsForCustomElement = function(allBindings, node, bindingContext, valueAccessors) {
	        // Determine if it's really a custom element matching a component
	        if (node.nodeType === 1) {
	            var componentName = ko.components['getComponentNameForNode'](node);
	            if (componentName) {
	                // It does represent a component, so add a component binding for it
	                allBindings = allBindings || {};
	
	                if (allBindings['component']) {
	                    // Avoid silently overwriting some other 'component' binding that may already be on the element
	                    throw new Error('Cannot use the "component" binding on a custom element matching a component');
	                }
	
	                var componentBindingValue = { 'name': componentName, 'params': getComponentParamsFromCustomElement(node, bindingContext) };
	
	                allBindings['component'] = valueAccessors
	                    ? function() { return componentBindingValue; }
	                    : componentBindingValue;
	            }
	        }
	
	        return allBindings;
	    }
	
	    var nativeBindingProviderInstance = new ko.bindingProvider();
	
	    function getComponentParamsFromCustomElement(elem, bindingContext) {
	        var paramsAttribute = elem.getAttribute('params');
	
	        if (paramsAttribute) {
	            var params = nativeBindingProviderInstance['parseBindingsString'](paramsAttribute, bindingContext, elem, { 'valueAccessors': true, 'bindingParams': true }),
	                rawParamComputedValues = ko.utils.objectMap(params, function(paramValue, paramName) {
	                    return ko.computed(paramValue, null, { disposeWhenNodeIsRemoved: elem });
	                }),
	                result = ko.utils.objectMap(rawParamComputedValues, function(paramValueComputed, paramName) {
	                    var paramValue = paramValueComputed.peek();
	                    // Does the evaluation of the parameter value unwrap any observables?
	                    if (!paramValueComputed.isActive()) {
	                        // No it doesn't, so there's no need for any computed wrapper. Just pass through the supplied value directly.
	                        // Example: "someVal: firstName, age: 123" (whether or not firstName is an observable/computed)
	                        return paramValue;
	                    } else {
	                        // Yes it does. Supply a computed property that unwraps both the outer (binding expression)
	                        // level of observability, and any inner (resulting model value) level of observability.
	                        // This means the component doesn't have to worry about multiple unwrapping. If the value is a
	                        // writable observable, the computed will also be writable and pass the value on to the observable.
	                        return ko.computed({
	                            'read': function() {
	                                return ko.utils.unwrapObservable(paramValueComputed());
	                            },
	                            'write': ko.isWriteableObservable(paramValue) && function(value) {
	                                paramValueComputed()(value);
	                            },
	                            disposeWhenNodeIsRemoved: elem
	                        });
	                    }
	                });
	
	            // Give access to the raw computeds, as long as that wouldn't overwrite any custom param also called '$raw'
	            // This is in case the developer wants to react to outer (binding) observability separately from inner
	            // (model value) observability, or in case the model value observable has subobservables.
	            if (!result.hasOwnProperty('$raw')) {
	                result['$raw'] = rawParamComputedValues;
	            }
	
	            return result;
	        } else {
	            // For consistency, absence of a "params" attribute is treated the same as the presence of
	            // any empty one. Otherwise component viewmodels need special code to check whether or not
	            // 'params' or 'params.$raw' is null/undefined before reading subproperties, which is annoying.
	            return { '$raw': {} };
	        }
	    }
	
	    // --------------------------------------------------------------------------------
	    // Compatibility code for older (pre-HTML5) IE browsers
	
	    if (ko.utils.ieVersion < 9) {
	        // Whenever you preregister a component, enable it as a custom element in the current document
	        ko.components['register'] = (function(originalFunction) {
	            return function(componentName) {
	                document.createElement(componentName); // Allows IE<9 to parse markup containing the custom element
	                return originalFunction.apply(this, arguments);
	            }
	        })(ko.components['register']);
	
	        // Whenever you create a document fragment, enable all preregistered component names as custom elements
	        // This is needed to make innerShiv/jQuery HTML parsing correctly handle the custom elements
	        document.createDocumentFragment = (function(originalFunction) {
	            return function() {
	                var newDocFrag = originalFunction(),
	                    allComponents = ko.components._allRegisteredComponents;
	                for (var componentName in allComponents) {
	                    if (allComponents.hasOwnProperty(componentName)) {
	                        newDocFrag.createElement(componentName);
	                    }
	                }
	                return newDocFrag;
	            };
	        })(document.createDocumentFragment);
	    }
	})();(function(undefined) {
	
	    var componentLoadingOperationUniqueId = 0;
	
	    ko.bindingHandlers['component'] = {
	        'init': function(element, valueAccessor, ignored1, ignored2, bindingContext) {
	            var currentViewModel,
	                currentLoadingOperationId,
	                disposeAssociatedComponentViewModel = function () {
	                    var currentViewModelDispose = currentViewModel && currentViewModel['dispose'];
	                    if (typeof currentViewModelDispose === 'function') {
	                        currentViewModelDispose.call(currentViewModel);
	                    }
	                    currentViewModel = null;
	                    // Any in-flight loading operation is no longer relevant, so make sure we ignore its completion
	                    currentLoadingOperationId = null;
	                },
	                originalChildNodes = ko.utils.makeArray(ko.virtualElements.childNodes(element));
	
	            ko.utils.domNodeDisposal.addDisposeCallback(element, disposeAssociatedComponentViewModel);
	
	            ko.computed(function () {
	                var value = ko.utils.unwrapObservable(valueAccessor()),
	                    componentName, componentParams;
	
	                if (typeof value === 'string') {
	                    componentName = value;
	                } else {
	                    componentName = ko.utils.unwrapObservable(value['name']);
	                    componentParams = ko.utils.unwrapObservable(value['params']);
	                }
	
	                if (!componentName) {
	                    throw new Error('No component name specified');
	                }
	
	                var loadingOperationId = currentLoadingOperationId = ++componentLoadingOperationUniqueId;
	                ko.components.get(componentName, function(componentDefinition) {
	                    // If this is not the current load operation for this element, ignore it.
	                    if (currentLoadingOperationId !== loadingOperationId) {
	                        return;
	                    }
	
	                    // Clean up previous state
	                    disposeAssociatedComponentViewModel();
	
	                    // Instantiate and bind new component. Implicitly this cleans any old DOM nodes.
	                    if (!componentDefinition) {
	                        throw new Error('Unknown component \'' + componentName + '\'');
	                    }
	                    cloneTemplateIntoElement(componentName, componentDefinition, element);
	                    var componentViewModel = createViewModel(componentDefinition, element, originalChildNodes, componentParams),
	                        childBindingContext = bindingContext['createChildContext'](componentViewModel, /* dataItemAlias */ undefined, function(ctx) {
	                            ctx['$component'] = componentViewModel;
	                            ctx['$componentTemplateNodes'] = originalChildNodes;
	                        });
	                    currentViewModel = componentViewModel;
	                    ko.applyBindingsToDescendants(childBindingContext, element);
	                });
	            }, null, { disposeWhenNodeIsRemoved: element });
	
	            return { 'controlsDescendantBindings': true };
	        }
	    };
	
	    ko.virtualElements.allowedBindings['component'] = true;
	
	    function cloneTemplateIntoElement(componentName, componentDefinition, element) {
	        var template = componentDefinition['template'];
	        if (!template) {
	            throw new Error('Component \'' + componentName + '\' has no template');
	        }
	
	        var clonedNodesArray = ko.utils.cloneNodes(template);
	        ko.virtualElements.setDomNodeChildren(element, clonedNodesArray);
	    }
	
	    function createViewModel(componentDefinition, element, originalChildNodes, componentParams) {
	        var componentViewModelFactory = componentDefinition['createViewModel'];
	        return componentViewModelFactory
	            ? componentViewModelFactory.call(componentDefinition, componentParams, { 'element': element, 'templateNodes': originalChildNodes })
	            : componentParams; // Template-only component
	    }
	
	})();
	var attrHtmlToJavascriptMap = { 'class': 'className', 'for': 'htmlFor' };
	ko.bindingHandlers['attr'] = {
	    'update': function(element, valueAccessor, allBindings) {
	        var value = ko.utils.unwrapObservable(valueAccessor()) || {};
	        ko.utils.objectForEach(value, function(attrName, attrValue) {
	            attrValue = ko.utils.unwrapObservable(attrValue);
	
	            // To cover cases like "attr: { checked:someProp }", we want to remove the attribute entirely
	            // when someProp is a "no value"-like value (strictly null, false, or undefined)
	            // (because the absence of the "checked" attr is how to mark an element as not checked, etc.)
	            var toRemove = (attrValue === false) || (attrValue === null) || (attrValue === undefined);
	            if (toRemove)
	                element.removeAttribute(attrName);
	
	            // In IE <= 7 and IE8 Quirks Mode, you have to use the Javascript property name instead of the
	            // HTML attribute name for certain attributes. IE8 Standards Mode supports the correct behavior,
	            // but instead of figuring out the mode, we'll just set the attribute through the Javascript
	            // property for IE <= 8.
	            if (ko.utils.ieVersion <= 8 && attrName in attrHtmlToJavascriptMap) {
	                attrName = attrHtmlToJavascriptMap[attrName];
	                if (toRemove)
	                    element.removeAttribute(attrName);
	                else
	                    element[attrName] = attrValue;
	            } else if (!toRemove) {
	                element.setAttribute(attrName, attrValue.toString());
	            }
	
	            // Treat "name" specially - although you can think of it as an attribute, it also needs
	            // special handling on older versions of IE (https://github.com/SteveSanderson/knockout/pull/333)
	            // Deliberately being case-sensitive here because XHTML would regard "Name" as a different thing
	            // entirely, and there's no strong reason to allow for such casing in HTML.
	            if (attrName === "name") {
	                ko.utils.setElementName(element, toRemove ? "" : attrValue.toString());
	            }
	        });
	    }
	};
	(function() {
	
	ko.bindingHandlers['checked'] = {
	    'after': ['value', 'attr'],
	    'init': function (element, valueAccessor, allBindings) {
	        var checkedValue = ko.pureComputed(function() {
	            // Treat "value" like "checkedValue" when it is included with "checked" binding
	            if (allBindings['has']('checkedValue')) {
	                return ko.utils.unwrapObservable(allBindings.get('checkedValue'));
	            } else if (allBindings['has']('value')) {
	                return ko.utils.unwrapObservable(allBindings.get('value'));
	            }
	
	            return element.value;
	        });
	
	        function updateModel() {
	            // This updates the model value from the view value.
	            // It runs in response to DOM events (click) and changes in checkedValue.
	            var isChecked = element.checked,
	                elemValue = useCheckedValue ? checkedValue() : isChecked;
	
	            // When we're first setting up this computed, don't change any model state.
	            if (ko.computedContext.isInitial()) {
	                return;
	            }
	
	            // We can ignore unchecked radio buttons, because some other radio
	            // button will be getting checked, and that one can take care of updating state.
	            if (isRadio && !isChecked) {
	                return;
	            }
	
	            var modelValue = ko.dependencyDetection.ignore(valueAccessor);
	            if (valueIsArray) {
	                var writableValue = rawValueIsNonArrayObservable ? modelValue.peek() : modelValue;
	                if (oldElemValue !== elemValue) {
	                    // When we're responding to the checkedValue changing, and the element is
	                    // currently checked, replace the old elem value with the new elem value
	                    // in the model array.
	                    if (isChecked) {
	                        ko.utils.addOrRemoveItem(writableValue, elemValue, true);
	                        ko.utils.addOrRemoveItem(writableValue, oldElemValue, false);
	                    }
	
	                    oldElemValue = elemValue;
	                } else {
	                    // When we're responding to the user having checked/unchecked a checkbox,
	                    // add/remove the element value to the model array.
	                    ko.utils.addOrRemoveItem(writableValue, elemValue, isChecked);
	                }
	                if (rawValueIsNonArrayObservable && ko.isWriteableObservable(modelValue)) {
	                    modelValue(writableValue);
	                }
	            } else {
	                ko.expressionRewriting.writeValueToProperty(modelValue, allBindings, 'checked', elemValue, true);
	            }
	        };
	
	        function updateView() {
	            // This updates the view value from the model value.
	            // It runs in response to changes in the bound (checked) value.
	            var modelValue = ko.utils.unwrapObservable(valueAccessor());
	
	            if (valueIsArray) {
	                // When a checkbox is bound to an array, being checked represents its value being present in that array
	                element.checked = ko.utils.arrayIndexOf(modelValue, checkedValue()) >= 0;
	            } else if (isCheckbox) {
	                // When a checkbox is bound to any other value (not an array), being checked represents the value being trueish
	                element.checked = modelValue;
	            } else {
	                // For radio buttons, being checked means that the radio button's value corresponds to the model value
	                element.checked = (checkedValue() === modelValue);
	            }
	        };
	
	        var isCheckbox = element.type == "checkbox",
	            isRadio = element.type == "radio";
	
	        // Only bind to check boxes and radio buttons
	        if (!isCheckbox && !isRadio) {
	            return;
	        }
	
	        var rawValue = valueAccessor(),
	            valueIsArray = isCheckbox && (ko.utils.unwrapObservable(rawValue) instanceof Array),
	            rawValueIsNonArrayObservable = !(valueIsArray && rawValue.push && rawValue.splice),
	            oldElemValue = valueIsArray ? checkedValue() : undefined,
	            useCheckedValue = isRadio || valueIsArray;
	
	        // IE 6 won't allow radio buttons to be selected unless they have a name
	        if (isRadio && !element.name)
	            ko.bindingHandlers['uniqueName']['init'](element, function() { return true });
	
	        // Set up two computeds to update the binding:
	
	        // The first responds to changes in the checkedValue value and to element clicks
	        ko.computed(updateModel, null, { disposeWhenNodeIsRemoved: element });
	        ko.utils.registerEventHandler(element, "click", updateModel);
	
	        // The second responds to changes in the model value (the one associated with the checked binding)
	        ko.computed(updateView, null, { disposeWhenNodeIsRemoved: element });
	
	        rawValue = undefined;
	    }
	};
	ko.expressionRewriting.twoWayBindings['checked'] = true;
	
	ko.bindingHandlers['checkedValue'] = {
	    'update': function (element, valueAccessor) {
	        element.value = ko.utils.unwrapObservable(valueAccessor());
	    }
	};
	
	})();var classesWrittenByBindingKey = '__ko__cssValue';
	ko.bindingHandlers['css'] = {
	    'update': function (element, valueAccessor) {
	        var value = ko.utils.unwrapObservable(valueAccessor());
	        if (value !== null && typeof value == "object") {
	            ko.utils.objectForEach(value, function(className, shouldHaveClass) {
	                shouldHaveClass = ko.utils.unwrapObservable(shouldHaveClass);
	                ko.utils.toggleDomNodeCssClass(element, className, shouldHaveClass);
	            });
	        } else {
	            value = ko.utils.stringTrim(String(value || '')); // Make sure we don't try to store or set a non-string value
	            ko.utils.toggleDomNodeCssClass(element, element[classesWrittenByBindingKey], false);
	            element[classesWrittenByBindingKey] = value;
	            ko.utils.toggleDomNodeCssClass(element, value, true);
	        }
	    }
	};
	ko.bindingHandlers['enable'] = {
	    'update': function (element, valueAccessor) {
	        var value = ko.utils.unwrapObservable(valueAccessor());
	        if (value && element.disabled)
	            element.removeAttribute("disabled");
	        else if ((!value) && (!element.disabled))
	            element.disabled = true;
	    }
	};
	
	ko.bindingHandlers['disable'] = {
	    'update': function (element, valueAccessor) {
	        ko.bindingHandlers['enable']['update'](element, function() { return !ko.utils.unwrapObservable(valueAccessor()) });
	    }
	};
	// For certain common events (currently just 'click'), allow a simplified data-binding syntax
	// e.g. click:handler instead of the usual full-length event:{click:handler}
	function makeEventHandlerShortcut(eventName) {
	    ko.bindingHandlers[eventName] = {
	        'init': function(element, valueAccessor, allBindings, viewModel, bindingContext) {
	            var newValueAccessor = function () {
	                var result = {};
	                result[eventName] = valueAccessor();
	                return result;
	            };
	            return ko.bindingHandlers['event']['init'].call(this, element, newValueAccessor, allBindings, viewModel, bindingContext);
	        }
	    }
	}
	
	ko.bindingHandlers['event'] = {
	    'init' : function (element, valueAccessor, allBindings, viewModel, bindingContext) {
	        var eventsToHandle = valueAccessor() || {};
	        ko.utils.objectForEach(eventsToHandle, function(eventName) {
	            if (typeof eventName == "string") {
	                ko.utils.registerEventHandler(element, eventName, function (event) {
	                    var handlerReturnValue;
	                    var handlerFunction = valueAccessor()[eventName];
	                    if (!handlerFunction)
	                        return;
	
	                    try {
	                        // Take all the event args, and prefix with the viewmodel
	                        var argsForHandler = ko.utils.makeArray(arguments);
	                        viewModel = bindingContext['$data'];
	                        argsForHandler.unshift(viewModel);
	                        handlerReturnValue = handlerFunction.apply(viewModel, argsForHandler);
	                    } finally {
	                        if (handlerReturnValue !== true) { // Normally we want to prevent default action. Developer can override this be explicitly returning true.
	                            if (event.preventDefault)
	                                event.preventDefault();
	                            else
	                                event.returnValue = false;
	                        }
	                    }
	
	                    var bubble = allBindings.get(eventName + 'Bubble') !== false;
	                    if (!bubble) {
	                        event.cancelBubble = true;
	                        if (event.stopPropagation)
	                            event.stopPropagation();
	                    }
	                });
	            }
	        });
	    }
	};
	// "foreach: someExpression" is equivalent to "template: { foreach: someExpression }"
	// "foreach: { data: someExpression, afterAdd: myfn }" is equivalent to "template: { foreach: someExpression, afterAdd: myfn }"
	ko.bindingHandlers['foreach'] = {
	    makeTemplateValueAccessor: function(valueAccessor) {
	        return function() {
	            var modelValue = valueAccessor(),
	                unwrappedValue = ko.utils.peekObservable(modelValue);    // Unwrap without setting a dependency here
	
	            // If unwrappedValue is the array, pass in the wrapped value on its own
	            // The value will be unwrapped and tracked within the template binding
	            // (See https://github.com/SteveSanderson/knockout/issues/523)
	            if ((!unwrappedValue) || typeof unwrappedValue.length == "number")
	                return { 'foreach': modelValue, 'templateEngine': ko.nativeTemplateEngine.instance };
	
	            // If unwrappedValue.data is the array, preserve all relevant options and unwrap again value so we get updates
	            ko.utils.unwrapObservable(modelValue);
	            return {
	                'foreach': unwrappedValue['data'],
	                'as': unwrappedValue['as'],
	                'includeDestroyed': unwrappedValue['includeDestroyed'],
	                'afterAdd': unwrappedValue['afterAdd'],
	                'beforeRemove': unwrappedValue['beforeRemove'],
	                'afterRender': unwrappedValue['afterRender'],
	                'beforeMove': unwrappedValue['beforeMove'],
	                'afterMove': unwrappedValue['afterMove'],
	                'templateEngine': ko.nativeTemplateEngine.instance
	            };
	        };
	    },
	    'init': function(element, valueAccessor, allBindings, viewModel, bindingContext) {
	        return ko.bindingHandlers['template']['init'](element, ko.bindingHandlers['foreach'].makeTemplateValueAccessor(valueAccessor));
	    },
	    'update': function(element, valueAccessor, allBindings, viewModel, bindingContext) {
	        return ko.bindingHandlers['template']['update'](element, ko.bindingHandlers['foreach'].makeTemplateValueAccessor(valueAccessor), allBindings, viewModel, bindingContext);
	    }
	};
	ko.expressionRewriting.bindingRewriteValidators['foreach'] = false; // Can't rewrite control flow bindings
	ko.virtualElements.allowedBindings['foreach'] = true;
	var hasfocusUpdatingProperty = '__ko_hasfocusUpdating';
	var hasfocusLastValue = '__ko_hasfocusLastValue';
	ko.bindingHandlers['hasfocus'] = {
	    'init': function(element, valueAccessor, allBindings) {
	        var handleElementFocusChange = function(isFocused) {
	            // Where possible, ignore which event was raised and determine focus state using activeElement,
	            // as this avoids phantom focus/blur events raised when changing tabs in modern browsers.
	            // However, not all KO-targeted browsers (Firefox 2) support activeElement. For those browsers,
	            // prevent a loss of focus when changing tabs/windows by setting a flag that prevents hasfocus
	            // from calling 'blur()' on the element when it loses focus.
	            // Discussion at https://github.com/SteveSanderson/knockout/pull/352
	            element[hasfocusUpdatingProperty] = true;
	            var ownerDoc = element.ownerDocument;
	            if ("activeElement" in ownerDoc) {
	                var active;
	                try {
	                    active = ownerDoc.activeElement;
	                } catch(e) {
	                    // IE9 throws if you access activeElement during page load (see issue #703)
	                    active = ownerDoc.body;
	                }
	                isFocused = (active === element);
	            }
	            var modelValue = valueAccessor();
	            ko.expressionRewriting.writeValueToProperty(modelValue, allBindings, 'hasfocus', isFocused, true);
	
	            //cache the latest value, so we can avoid unnecessarily calling focus/blur in the update function
	            element[hasfocusLastValue] = isFocused;
	            element[hasfocusUpdatingProperty] = false;
	        };
	        var handleElementFocusIn = handleElementFocusChange.bind(null, true);
	        var handleElementFocusOut = handleElementFocusChange.bind(null, false);
	
	        ko.utils.registerEventHandler(element, "focus", handleElementFocusIn);
	        ko.utils.registerEventHandler(element, "focusin", handleElementFocusIn); // For IE
	        ko.utils.registerEventHandler(element, "blur",  handleElementFocusOut);
	        ko.utils.registerEventHandler(element, "focusout",  handleElementFocusOut); // For IE
	    },
	    'update': function(element, valueAccessor) {
	        var value = !!ko.utils.unwrapObservable(valueAccessor());
	
	        if (!element[hasfocusUpdatingProperty] && element[hasfocusLastValue] !== value) {
	            value ? element.focus() : element.blur();
	
	            // In IE, the blur method doesn't always cause the element to lose focus (for example, if the window is not in focus).
	            // Setting focus to the body element does seem to be reliable in IE, but should only be used if we know that the current
	            // element was focused already.
	            if (!value && element[hasfocusLastValue]) {
	                element.ownerDocument.body.focus();
	            }
	
	            // For IE, which doesn't reliably fire "focus" or "blur" events synchronously
	            ko.dependencyDetection.ignore(ko.utils.triggerEvent, null, [element, value ? "focusin" : "focusout"]);
	        }
	    }
	};
	ko.expressionRewriting.twoWayBindings['hasfocus'] = true;
	
	ko.bindingHandlers['hasFocus'] = ko.bindingHandlers['hasfocus']; // Make "hasFocus" an alias
	ko.expressionRewriting.twoWayBindings['hasFocus'] = true;
	ko.bindingHandlers['html'] = {
	    'init': function() {
	        // Prevent binding on the dynamically-injected HTML (as developers are unlikely to expect that, and it has security implications)
	        return { 'controlsDescendantBindings': true };
	    },
	    'update': function (element, valueAccessor) {
	        // setHtml will unwrap the value if needed
	        ko.utils.setHtml(element, valueAccessor());
	    }
	};
	// Makes a binding like with or if
	function makeWithIfBinding(bindingKey, isWith, isNot, makeContextCallback) {
	    ko.bindingHandlers[bindingKey] = {
	        'init': function(element, valueAccessor, allBindings, viewModel, bindingContext) {
	            var didDisplayOnLastUpdate,
	                savedNodes;
	            ko.computed(function() {
	                var rawValue = valueAccessor(),
	                    dataValue = ko.utils.unwrapObservable(rawValue),
	                    shouldDisplay = !isNot !== !dataValue, // equivalent to isNot ? !dataValue : !!dataValue
	                    isFirstRender = !savedNodes,
	                    needsRefresh = isFirstRender || isWith || (shouldDisplay !== didDisplayOnLastUpdate);
	
	                if (needsRefresh) {
	                    // Save a copy of the inner nodes on the initial update, but only if we have dependencies.
	                    if (isFirstRender && ko.computedContext.getDependenciesCount()) {
	                        savedNodes = ko.utils.cloneNodes(ko.virtualElements.childNodes(element), true /* shouldCleanNodes */);
	                    }
	
	                    if (shouldDisplay) {
	                        if (!isFirstRender) {
	                            ko.virtualElements.setDomNodeChildren(element, ko.utils.cloneNodes(savedNodes));
	                        }
	                        ko.applyBindingsToDescendants(makeContextCallback ? makeContextCallback(bindingContext, rawValue) : bindingContext, element);
	                    } else {
	                        ko.virtualElements.emptyNode(element);
	                    }
	
	                    didDisplayOnLastUpdate = shouldDisplay;
	                }
	            }, null, { disposeWhenNodeIsRemoved: element });
	            return { 'controlsDescendantBindings': true };
	        }
	    };
	    ko.expressionRewriting.bindingRewriteValidators[bindingKey] = false; // Can't rewrite control flow bindings
	    ko.virtualElements.allowedBindings[bindingKey] = true;
	}
	
	// Construct the actual binding handlers
	makeWithIfBinding('if');
	makeWithIfBinding('ifnot', false /* isWith */, true /* isNot */);
	makeWithIfBinding('with', true /* isWith */, false /* isNot */,
	    function(bindingContext, dataValue) {
	        return bindingContext.createStaticChildContext(dataValue);
	    }
	);
	var captionPlaceholder = {};
	ko.bindingHandlers['options'] = {
	    'init': function(element) {
	        if (ko.utils.tagNameLower(element) !== "select")
	            throw new Error("options binding applies only to SELECT elements");
	
	        // Remove all existing <option>s.
	        while (element.length > 0) {
	            element.remove(0);
	        }
	
	        // Ensures that the binding processor doesn't try to bind the options
	        return { 'controlsDescendantBindings': true };
	    },
	    'update': function (element, valueAccessor, allBindings) {
	        function selectedOptions() {
	            return ko.utils.arrayFilter(element.options, function (node) { return node.selected; });
	        }
	
	        var selectWasPreviouslyEmpty = element.length == 0,
	            multiple = element.multiple,
	            previousScrollTop = (!selectWasPreviouslyEmpty && multiple) ? element.scrollTop : null,
	            unwrappedArray = ko.utils.unwrapObservable(valueAccessor()),
	            valueAllowUnset = allBindings.get('valueAllowUnset') && allBindings['has']('value'),
	            includeDestroyed = allBindings.get('optionsIncludeDestroyed'),
	            arrayToDomNodeChildrenOptions = {},
	            captionValue,
	            filteredArray,
	            previousSelectedValues = [];
	
	        if (!valueAllowUnset) {
	            if (multiple) {
	                previousSelectedValues = ko.utils.arrayMap(selectedOptions(), ko.selectExtensions.readValue);
	            } else if (element.selectedIndex >= 0) {
	                previousSelectedValues.push(ko.selectExtensions.readValue(element.options[element.selectedIndex]));
	            }
	        }
	
	        if (unwrappedArray) {
	            if (typeof unwrappedArray.length == "undefined") // Coerce single value into array
	                unwrappedArray = [unwrappedArray];
	
	            // Filter out any entries marked as destroyed
	            filteredArray = ko.utils.arrayFilter(unwrappedArray, function(item) {
	                return includeDestroyed || item === undefined || item === null || !ko.utils.unwrapObservable(item['_destroy']);
	            });
	
	            // If caption is included, add it to the array
	            if (allBindings['has']('optionsCaption')) {
	                captionValue = ko.utils.unwrapObservable(allBindings.get('optionsCaption'));
	                // If caption value is null or undefined, don't show a caption
	                if (captionValue !== null && captionValue !== undefined) {
	                    filteredArray.unshift(captionPlaceholder);
	                }
	            }
	        } else {
	            // If a falsy value is provided (e.g. null), we'll simply empty the select element
	        }
	
	        function applyToObject(object, predicate, defaultValue) {
	            var predicateType = typeof predicate;
	            if (predicateType == "function")    // Given a function; run it against the data value
	                return predicate(object);
	            else if (predicateType == "string") // Given a string; treat it as a property name on the data value
	                return object[predicate];
	            else                                // Given no optionsText arg; use the data value itself
	                return defaultValue;
	        }
	
	        // The following functions can run at two different times:
	        // The first is when the whole array is being updated directly from this binding handler.
	        // The second is when an observable value for a specific array entry is updated.
	        // oldOptions will be empty in the first case, but will be filled with the previously generated option in the second.
	        var itemUpdate = false;
	        function optionForArrayItem(arrayEntry, index, oldOptions) {
	            if (oldOptions.length) {
	                previousSelectedValues = !valueAllowUnset && oldOptions[0].selected ? [ ko.selectExtensions.readValue(oldOptions[0]) ] : [];
	                itemUpdate = true;
	            }
	            var option = element.ownerDocument.createElement("option");
	            if (arrayEntry === captionPlaceholder) {
	                ko.utils.setTextContent(option, allBindings.get('optionsCaption'));
	                ko.selectExtensions.writeValue(option, undefined);
	            } else {
	                // Apply a value to the option element
	                var optionValue = applyToObject(arrayEntry, allBindings.get('optionsValue'), arrayEntry);
	                ko.selectExtensions.writeValue(option, ko.utils.unwrapObservable(optionValue));
	
	                // Apply some text to the option element
	                var optionText = applyToObject(arrayEntry, allBindings.get('optionsText'), optionValue);
	                ko.utils.setTextContent(option, optionText);
	            }
	            return [option];
	        }
	
	        // By using a beforeRemove callback, we delay the removal until after new items are added. This fixes a selection
	        // problem in IE<=8 and Firefox. See https://github.com/knockout/knockout/issues/1208
	        arrayToDomNodeChildrenOptions['beforeRemove'] =
	            function (option) {
	                element.removeChild(option);
	            };
	
	        function setSelectionCallback(arrayEntry, newOptions) {
	            if (itemUpdate && valueAllowUnset) {
	                // The model value is authoritative, so make sure its value is the one selected
	                // There is no need to use dependencyDetection.ignore since setDomNodeChildrenFromArrayMapping does so already.
	                ko.selectExtensions.writeValue(element, ko.utils.unwrapObservable(allBindings.get('value')), true /* allowUnset */);
	            } else if (previousSelectedValues.length) {
	                // IE6 doesn't like us to assign selection to OPTION nodes before they're added to the document.
	                // That's why we first added them without selection. Now it's time to set the selection.
	                var isSelected = ko.utils.arrayIndexOf(previousSelectedValues, ko.selectExtensions.readValue(newOptions[0])) >= 0;
	                ko.utils.setOptionNodeSelectionState(newOptions[0], isSelected);
	
	                // If this option was changed from being selected during a single-item update, notify the change
	                if (itemUpdate && !isSelected) {
	                    ko.dependencyDetection.ignore(ko.utils.triggerEvent, null, [element, "change"]);
	                }
	            }
	        }
	
	        var callback = setSelectionCallback;
	        if (allBindings['has']('optionsAfterRender') && typeof allBindings.get('optionsAfterRender') == "function") {
	            callback = function(arrayEntry, newOptions) {
	                setSelectionCallback(arrayEntry, newOptions);
	                ko.dependencyDetection.ignore(allBindings.get('optionsAfterRender'), null, [newOptions[0], arrayEntry !== captionPlaceholder ? arrayEntry : undefined]);
	            }
	        }
	
	        ko.utils.setDomNodeChildrenFromArrayMapping(element, filteredArray, optionForArrayItem, arrayToDomNodeChildrenOptions, callback);
	
	        ko.dependencyDetection.ignore(function () {
	            if (valueAllowUnset) {
	                // The model value is authoritative, so make sure its value is the one selected
	                ko.selectExtensions.writeValue(element, ko.utils.unwrapObservable(allBindings.get('value')), true /* allowUnset */);
	            } else {
	                // Determine if the selection has changed as a result of updating the options list
	                var selectionChanged;
	                if (multiple) {
	                    // For a multiple-select box, compare the new selection count to the previous one
	                    // But if nothing was selected before, the selection can't have changed
	                    selectionChanged = previousSelectedValues.length && selectedOptions().length < previousSelectedValues.length;
	                } else {
	                    // For a single-select box, compare the current value to the previous value
	                    // But if nothing was selected before or nothing is selected now, just look for a change in selection
	                    selectionChanged = (previousSelectedValues.length && element.selectedIndex >= 0)
	                        ? (ko.selectExtensions.readValue(element.options[element.selectedIndex]) !== previousSelectedValues[0])
	                        : (previousSelectedValues.length || element.selectedIndex >= 0);
	                }
	
	                // Ensure consistency between model value and selected option.
	                // If the dropdown was changed so that selection is no longer the same,
	                // notify the value or selectedOptions binding.
	                if (selectionChanged) {
	                    ko.utils.triggerEvent(element, "change");
	                }
	            }
	        });
	
	        // Workaround for IE bug
	        ko.utils.ensureSelectElementIsRenderedCorrectly(element);
	
	        if (previousScrollTop && Math.abs(previousScrollTop - element.scrollTop) > 20)
	            element.scrollTop = previousScrollTop;
	    }
	};
	ko.bindingHandlers['options'].optionValueDomDataKey = ko.utils.domData.nextKey();
	ko.bindingHandlers['selectedOptions'] = {
	    'after': ['options', 'foreach'],
	    'init': function (element, valueAccessor, allBindings) {
	        ko.utils.registerEventHandler(element, "change", function () {
	            var value = valueAccessor(), valueToWrite = [];
	            ko.utils.arrayForEach(element.getElementsByTagName("option"), function(node) {
	                if (node.selected)
	                    valueToWrite.push(ko.selectExtensions.readValue(node));
	            });
	            ko.expressionRewriting.writeValueToProperty(value, allBindings, 'selectedOptions', valueToWrite);
	        });
	    },
	    'update': function (element, valueAccessor) {
	        if (ko.utils.tagNameLower(element) != "select")
	            throw new Error("values binding applies only to SELECT elements");
	
	        var newValue = ko.utils.unwrapObservable(valueAccessor()),
	            previousScrollTop = element.scrollTop;
	
	        if (newValue && typeof newValue.length == "number") {
	            ko.utils.arrayForEach(element.getElementsByTagName("option"), function(node) {
	                var isSelected = ko.utils.arrayIndexOf(newValue, ko.selectExtensions.readValue(node)) >= 0;
	                if (node.selected != isSelected) {      // This check prevents flashing of the select element in IE
	                    ko.utils.setOptionNodeSelectionState(node, isSelected);
	                }
	            });
	        }
	
	        element.scrollTop = previousScrollTop;
	    }
	};
	ko.expressionRewriting.twoWayBindings['selectedOptions'] = true;
	ko.bindingHandlers['style'] = {
	    'update': function (element, valueAccessor) {
	        var value = ko.utils.unwrapObservable(valueAccessor() || {});
	        ko.utils.objectForEach(value, function(styleName, styleValue) {
	            styleValue = ko.utils.unwrapObservable(styleValue);
	
	            if (styleValue === null || styleValue === undefined || styleValue === false) {
	                // Empty string removes the value, whereas null/undefined have no effect
	                styleValue = "";
	            }
	
	            element.style[styleName] = styleValue;
	        });
	    }
	};
	ko.bindingHandlers['submit'] = {
	    'init': function (element, valueAccessor, allBindings, viewModel, bindingContext) {
	        if (typeof valueAccessor() != "function")
	            throw new Error("The value for a submit binding must be a function");
	        ko.utils.registerEventHandler(element, "submit", function (event) {
	            var handlerReturnValue;
	            var value = valueAccessor();
	            try { handlerReturnValue = value.call(bindingContext['$data'], element); }
	            finally {
	                if (handlerReturnValue !== true) { // Normally we want to prevent default action. Developer can override this be explicitly returning true.
	                    if (event.preventDefault)
	                        event.preventDefault();
	                    else
	                        event.returnValue = false;
	                }
	            }
	        });
	    }
	};
	ko.bindingHandlers['text'] = {
	    'init': function() {
	        // Prevent binding on the dynamically-injected text node (as developers are unlikely to expect that, and it has security implications).
	        // It should also make things faster, as we no longer have to consider whether the text node might be bindable.
	        return { 'controlsDescendantBindings': true };
	    },
	    'update': function (element, valueAccessor) {
	        ko.utils.setTextContent(element, valueAccessor());
	    }
	};
	ko.virtualElements.allowedBindings['text'] = true;
	(function () {
	
	if (window && window.navigator) {
	    var parseVersion = function (matches) {
	        if (matches) {
	            return parseFloat(matches[1]);
	        }
	    };
	
	    // Detect various browser versions because some old versions don't fully support the 'input' event
	    var operaVersion = window.opera && window.opera.version && parseInt(window.opera.version()),
	        userAgent = window.navigator.userAgent,
	        safariVersion = parseVersion(userAgent.match(/^(?:(?!chrome).)*version\/([^ ]*) safari/i)),
	        firefoxVersion = parseVersion(userAgent.match(/Firefox\/([^ ]*)/));
	}
	
	// IE 8 and 9 have bugs that prevent the normal events from firing when the value changes.
	// But it does fire the 'selectionchange' event on many of those, presumably because the
	// cursor is moving and that counts as the selection changing. The 'selectionchange' event is
	// fired at the document level only and doesn't directly indicate which element changed. We
	// set up just one event handler for the document and use 'activeElement' to determine which
	// element was changed.
	if (ko.utils.ieVersion < 10) {
	    var selectionChangeRegisteredName = ko.utils.domData.nextKey(),
	        selectionChangeHandlerName = ko.utils.domData.nextKey();
	    var selectionChangeHandler = function(event) {
	        var target = this.activeElement,
	            handler = target && ko.utils.domData.get(target, selectionChangeHandlerName);
	        if (handler) {
	            handler(event);
	        }
	    };
	    var registerForSelectionChangeEvent = function (element, handler) {
	        var ownerDoc = element.ownerDocument;
	        if (!ko.utils.domData.get(ownerDoc, selectionChangeRegisteredName)) {
	            ko.utils.domData.set(ownerDoc, selectionChangeRegisteredName, true);
	            ko.utils.registerEventHandler(ownerDoc, 'selectionchange', selectionChangeHandler);
	        }
	        ko.utils.domData.set(element, selectionChangeHandlerName, handler);
	    };
	}
	
	ko.bindingHandlers['textInput'] = {
	    'init': function (element, valueAccessor, allBindings) {
	
	        var previousElementValue = element.value,
	            timeoutHandle,
	            elementValueBeforeEvent;
	
	        var updateModel = function (event) {
	            clearTimeout(timeoutHandle);
	            elementValueBeforeEvent = timeoutHandle = undefined;
	
	            var elementValue = element.value;
	            if (previousElementValue !== elementValue) {
	                // Provide a way for tests to know exactly which event was processed
	                if (DEBUG && event) element['_ko_textInputProcessedEvent'] = event.type;
	                previousElementValue = elementValue;
	                ko.expressionRewriting.writeValueToProperty(valueAccessor(), allBindings, 'textInput', elementValue);
	            }
	        };
	
	        var deferUpdateModel = function (event) {
	            if (!timeoutHandle) {
	                // The elementValueBeforeEvent variable is set *only* during the brief gap between an
	                // event firing and the updateModel function running. This allows us to ignore model
	                // updates that are from the previous state of the element, usually due to techniques
	                // such as rateLimit. Such updates, if not ignored, can cause keystrokes to be lost.
	                elementValueBeforeEvent = element.value;
	                var handler = DEBUG ? updateModel.bind(element, {type: event.type}) : updateModel;
	                timeoutHandle = ko.utils.setTimeout(handler, 4);
	            }
	        };
	
	        // IE9 will mess up the DOM if you handle events synchronously which results in DOM changes (such as other bindings);
	        // so we'll make sure all updates are asynchronous
	        var ieUpdateModel = ko.utils.ieVersion == 9 ? deferUpdateModel : updateModel;
	
	        var updateView = function () {
	            var modelValue = ko.utils.unwrapObservable(valueAccessor());
	
	            if (modelValue === null || modelValue === undefined) {
	                modelValue = '';
	            }
	
	            if (elementValueBeforeEvent !== undefined && modelValue === elementValueBeforeEvent) {
	                ko.utils.setTimeout(updateView, 4);
	                return;
	            }
	
	            // Update the element only if the element and model are different. On some browsers, updating the value
	            // will move the cursor to the end of the input, which would be bad while the user is typing.
	            if (element.value !== modelValue) {
	                previousElementValue = modelValue;  // Make sure we ignore events (propertychange) that result from updating the value
	                element.value = modelValue;
	            }
	        };
	
	        var onEvent = function (event, handler) {
	            ko.utils.registerEventHandler(element, event, handler);
	        };
	
	        if (DEBUG && ko.bindingHandlers['textInput']['_forceUpdateOn']) {
	            // Provide a way for tests to specify exactly which events are bound
	            ko.utils.arrayForEach(ko.bindingHandlers['textInput']['_forceUpdateOn'], function(eventName) {
	                if (eventName.slice(0,5) == 'after') {
	                    onEvent(eventName.slice(5), deferUpdateModel);
	                } else {
	                    onEvent(eventName, updateModel);
	                }
	            });
	        } else {
	            if (ko.utils.ieVersion < 10) {
	                // Internet Explorer <= 8 doesn't support the 'input' event, but does include 'propertychange' that fires whenever
	                // any property of an element changes. Unlike 'input', it also fires if a property is changed from JavaScript code,
	                // but that's an acceptable compromise for this binding. IE 9 does support 'input', but since it doesn't fire it
	                // when using autocomplete, we'll use 'propertychange' for it also.
	                onEvent('propertychange', function(event) {
	                    if (event.propertyName === 'value') {
	                        ieUpdateModel(event);
	                    }
	                });
	
	                if (ko.utils.ieVersion == 8) {
	                    // IE 8 has a bug where it fails to fire 'propertychange' on the first update following a value change from
	                    // JavaScript code. It also doesn't fire if you clear the entire value. To fix this, we bind to the following
	                    // events too.
	                    onEvent('keyup', updateModel);      // A single keystoke
	                    onEvent('keydown', updateModel);    // The first character when a key is held down
	                }
	                if (ko.utils.ieVersion >= 8) {
	                    // Internet Explorer 9 doesn't fire the 'input' event when deleting text, including using
	                    // the backspace, delete, or ctrl-x keys, clicking the 'x' to clear the input, dragging text
	                    // out of the field, and cutting or deleting text using the context menu. 'selectionchange'
	                    // can detect all of those except dragging text out of the field, for which we use 'dragend'.
	                    // These are also needed in IE8 because of the bug described above.
	                    registerForSelectionChangeEvent(element, ieUpdateModel);  // 'selectionchange' covers cut, paste, drop, delete, etc.
	                    onEvent('dragend', deferUpdateModel);
	                }
	            } else {
	                // All other supported browsers support the 'input' event, which fires whenever the content of the element is changed
	                // through the user interface.
	                onEvent('input', updateModel);
	
	                if (safariVersion < 5 && ko.utils.tagNameLower(element) === "textarea") {
	                    // Safari <5 doesn't fire the 'input' event for <textarea> elements (it does fire 'textInput'
	                    // but only when typing). So we'll just catch as much as we can with keydown, cut, and paste.
	                    onEvent('keydown', deferUpdateModel);
	                    onEvent('paste', deferUpdateModel);
	                    onEvent('cut', deferUpdateModel);
	                } else if (operaVersion < 11) {
	                    // Opera 10 doesn't always fire the 'input' event for cut, paste, undo & drop operations.
	                    // We can try to catch some of those using 'keydown'.
	                    onEvent('keydown', deferUpdateModel);
	                } else if (firefoxVersion < 4.0) {
	                    // Firefox <= 3.6 doesn't fire the 'input' event when text is filled in through autocomplete
	                    onEvent('DOMAutoComplete', updateModel);
	
	                    // Firefox <=3.5 doesn't fire the 'input' event when text is dropped into the input.
	                    onEvent('dragdrop', updateModel);       // <3.5
	                    onEvent('drop', updateModel);           // 3.5
	                }
	            }
	        }
	
	        // Bind to the change event so that we can catch programmatic updates of the value that fire this event.
	        onEvent('change', updateModel);
	
	        ko.computed(updateView, null, { disposeWhenNodeIsRemoved: element });
	    }
	};
	ko.expressionRewriting.twoWayBindings['textInput'] = true;
	
	// textinput is an alias for textInput
	ko.bindingHandlers['textinput'] = {
	    // preprocess is the only way to set up a full alias
	    'preprocess': function (value, name, addBinding) {
	        addBinding('textInput', value);
	    }
	};
	
	})();ko.bindingHandlers['uniqueName'] = {
	    'init': function (element, valueAccessor) {
	        if (valueAccessor()) {
	            var name = "ko_unique_" + (++ko.bindingHandlers['uniqueName'].currentIndex);
	            ko.utils.setElementName(element, name);
	        }
	    }
	};
	ko.bindingHandlers['uniqueName'].currentIndex = 0;
	ko.bindingHandlers['value'] = {
	    'after': ['options', 'foreach'],
	    'init': function (element, valueAccessor, allBindings) {
	        // If the value binding is placed on a radio/checkbox, then just pass through to checkedValue and quit
	        if (element.tagName.toLowerCase() == "input" && (element.type == "checkbox" || element.type == "radio")) {
	            ko.applyBindingAccessorsToNode(element, { 'checkedValue': valueAccessor });
	            return;
	        }
	
	        // Always catch "change" event; possibly other events too if asked
	        var eventsToCatch = ["change"];
	        var requestedEventsToCatch = allBindings.get("valueUpdate");
	        var propertyChangedFired = false;
	        var elementValueBeforeEvent = null;
	
	        if (requestedEventsToCatch) {
	            if (typeof requestedEventsToCatch == "string") // Allow both individual event names, and arrays of event names
	                requestedEventsToCatch = [requestedEventsToCatch];
	            ko.utils.arrayPushAll(eventsToCatch, requestedEventsToCatch);
	            eventsToCatch = ko.utils.arrayGetDistinctValues(eventsToCatch);
	        }
	
	        var valueUpdateHandler = function() {
	            elementValueBeforeEvent = null;
	            propertyChangedFired = false;
	            var modelValue = valueAccessor();
	            var elementValue = ko.selectExtensions.readValue(element);
	            ko.expressionRewriting.writeValueToProperty(modelValue, allBindings, 'value', elementValue);
	        }
	
	        // Workaround for https://github.com/SteveSanderson/knockout/issues/122
	        // IE doesn't fire "change" events on textboxes if the user selects a value from its autocomplete list
	        var ieAutoCompleteHackNeeded = ko.utils.ieVersion && element.tagName.toLowerCase() == "input" && element.type == "text"
	                                       && element.autocomplete != "off" && (!element.form || element.form.autocomplete != "off");
	        if (ieAutoCompleteHackNeeded && ko.utils.arrayIndexOf(eventsToCatch, "propertychange") == -1) {
	            ko.utils.registerEventHandler(element, "propertychange", function () { propertyChangedFired = true });
	            ko.utils.registerEventHandler(element, "focus", function () { propertyChangedFired = false });
	            ko.utils.registerEventHandler(element, "blur", function() {
	                if (propertyChangedFired) {
	                    valueUpdateHandler();
	                }
	            });
	        }
	
	        ko.utils.arrayForEach(eventsToCatch, function(eventName) {
	            // The syntax "after<eventname>" means "run the handler asynchronously after the event"
	            // This is useful, for example, to catch "keydown" events after the browser has updated the control
	            // (otherwise, ko.selectExtensions.readValue(this) will receive the control's value *before* the key event)
	            var handler = valueUpdateHandler;
	            if (ko.utils.stringStartsWith(eventName, "after")) {
	                handler = function() {
	                    // The elementValueBeforeEvent variable is non-null *only* during the brief gap between
	                    // a keyX event firing and the valueUpdateHandler running, which is scheduled to happen
	                    // at the earliest asynchronous opportunity. We store this temporary information so that
	                    // if, between keyX and valueUpdateHandler, the underlying model value changes separately,
	                    // we can overwrite that model value change with the value the user just typed. Otherwise,
	                    // techniques like rateLimit can trigger model changes at critical moments that will
	                    // override the user's inputs, causing keystrokes to be lost.
	                    elementValueBeforeEvent = ko.selectExtensions.readValue(element);
	                    ko.utils.setTimeout(valueUpdateHandler, 0);
	                };
	                eventName = eventName.substring("after".length);
	            }
	            ko.utils.registerEventHandler(element, eventName, handler);
	        });
	
	        var updateFromModel = function () {
	            var newValue = ko.utils.unwrapObservable(valueAccessor());
	            var elementValue = ko.selectExtensions.readValue(element);
	
	            if (elementValueBeforeEvent !== null && newValue === elementValueBeforeEvent) {
	                ko.utils.setTimeout(updateFromModel, 0);
	                return;
	            }
	
	            var valueHasChanged = (newValue !== elementValue);
	
	            if (valueHasChanged) {
	                if (ko.utils.tagNameLower(element) === "select") {
	                    var allowUnset = allBindings.get('valueAllowUnset');
	                    var applyValueAction = function () {
	                        ko.selectExtensions.writeValue(element, newValue, allowUnset);
	                    };
	                    applyValueAction();
	
	                    if (!allowUnset && newValue !== ko.selectExtensions.readValue(element)) {
	                        // If you try to set a model value that can't be represented in an already-populated dropdown, reject that change,
	                        // because you're not allowed to have a model value that disagrees with a visible UI selection.
	                        ko.dependencyDetection.ignore(ko.utils.triggerEvent, null, [element, "change"]);
	                    } else {
	                        // Workaround for IE6 bug: It won't reliably apply values to SELECT nodes during the same execution thread
	                        // right after you've changed the set of OPTION nodes on it. So for that node type, we'll schedule a second thread
	                        // to apply the value as well.
	                        ko.utils.setTimeout(applyValueAction, 0);
	                    }
	                } else {
	                    ko.selectExtensions.writeValue(element, newValue);
	                }
	            }
	        };
	
	        ko.computed(updateFromModel, null, { disposeWhenNodeIsRemoved: element });
	    },
	    'update': function() {} // Keep for backwards compatibility with code that may have wrapped value binding
	};
	ko.expressionRewriting.twoWayBindings['value'] = true;
	ko.bindingHandlers['visible'] = {
	    'update': function (element, valueAccessor) {
	        var value = ko.utils.unwrapObservable(valueAccessor());
	        var isCurrentlyVisible = !(element.style.display == "none");
	        if (value && !isCurrentlyVisible)
	            element.style.display = "";
	        else if ((!value) && isCurrentlyVisible)
	            element.style.display = "none";
	    }
	};
	// 'click' is just a shorthand for the usual full-length event:{click:handler}
	makeEventHandlerShortcut('click');
	// If you want to make a custom template engine,
	//
	// [1] Inherit from this class (like ko.nativeTemplateEngine does)
	// [2] Override 'renderTemplateSource', supplying a function with this signature:
	//
	//        function (templateSource, bindingContext, options) {
	//            // - templateSource.text() is the text of the template you should render
	//            // - bindingContext.$data is the data you should pass into the template
	//            //   - you might also want to make bindingContext.$parent, bindingContext.$parents,
	//            //     and bindingContext.$root available in the template too
	//            // - options gives you access to any other properties set on "data-bind: { template: options }"
	//            // - templateDocument is the document object of the template
	//            //
	//            // Return value: an array of DOM nodes
	//        }
	//
	// [3] Override 'createJavaScriptEvaluatorBlock', supplying a function with this signature:
	//
	//        function (script) {
	//            // Return value: Whatever syntax means "Evaluate the JavaScript statement 'script' and output the result"
	//            //               For example, the jquery.tmpl template engine converts 'someScript' to '${ someScript }'
	//        }
	//
	//     This is only necessary if you want to allow data-bind attributes to reference arbitrary template variables.
	//     If you don't want to allow that, you can set the property 'allowTemplateRewriting' to false (like ko.nativeTemplateEngine does)
	//     and then you don't need to override 'createJavaScriptEvaluatorBlock'.
	
	ko.templateEngine = function () { };
	
	ko.templateEngine.prototype['renderTemplateSource'] = function (templateSource, bindingContext, options, templateDocument) {
	    throw new Error("Override renderTemplateSource");
	};
	
	ko.templateEngine.prototype['createJavaScriptEvaluatorBlock'] = function (script) {
	    throw new Error("Override createJavaScriptEvaluatorBlock");
	};
	
	ko.templateEngine.prototype['makeTemplateSource'] = function(template, templateDocument) {
	    // Named template
	    if (typeof template == "string") {
	        templateDocument = templateDocument || document;
	        var elem = templateDocument.getElementById(template);
	        if (!elem)
	            throw new Error("Cannot find template with ID " + template);
	        return new ko.templateSources.domElement(elem);
	    } else if ((template.nodeType == 1) || (template.nodeType == 8)) {
	        // Anonymous template
	        return new ko.templateSources.anonymousTemplate(template);
	    } else
	        throw new Error("Unknown template type: " + template);
	};
	
	ko.templateEngine.prototype['renderTemplate'] = function (template, bindingContext, options, templateDocument) {
	    var templateSource = this['makeTemplateSource'](template, templateDocument);
	    return this['renderTemplateSource'](templateSource, bindingContext, options, templateDocument);
	};
	
	ko.templateEngine.prototype['isTemplateRewritten'] = function (template, templateDocument) {
	    // Skip rewriting if requested
	    if (this['allowTemplateRewriting'] === false)
	        return true;
	    return this['makeTemplateSource'](template, templateDocument)['data']("isRewritten");
	};
	
	ko.templateEngine.prototype['rewriteTemplate'] = function (template, rewriterCallback, templateDocument) {
	    var templateSource = this['makeTemplateSource'](template, templateDocument);
	    var rewritten = rewriterCallback(templateSource['text']());
	    templateSource['text'](rewritten);
	    templateSource['data']("isRewritten", true);
	};
	
	ko.exportSymbol('templateEngine', ko.templateEngine);
	
	ko.templateRewriting = (function () {
	    var memoizeDataBindingAttributeSyntaxRegex = /(<([a-z]+\d*)(?:\s+(?!data-bind\s*=\s*)[a-z0-9\-]+(?:=(?:\"[^\"]*\"|\'[^\']*\'|[^>]*))?)*\s+)data-bind\s*=\s*(["'])([\s\S]*?)\3/gi;
	    var memoizeVirtualContainerBindingSyntaxRegex = /<!--\s*ko\b\s*([\s\S]*?)\s*-->/g;
	
	    function validateDataBindValuesForRewriting(keyValueArray) {
	        var allValidators = ko.expressionRewriting.bindingRewriteValidators;
	        for (var i = 0; i < keyValueArray.length; i++) {
	            var key = keyValueArray[i]['key'];
	            if (allValidators.hasOwnProperty(key)) {
	                var validator = allValidators[key];
	
	                if (typeof validator === "function") {
	                    var possibleErrorMessage = validator(keyValueArray[i]['value']);
	                    if (possibleErrorMessage)
	                        throw new Error(possibleErrorMessage);
	                } else if (!validator) {
	                    throw new Error("This template engine does not support the '" + key + "' binding within its templates");
	                }
	            }
	        }
	    }
	
	    function constructMemoizedTagReplacement(dataBindAttributeValue, tagToRetain, nodeName, templateEngine) {
	        var dataBindKeyValueArray = ko.expressionRewriting.parseObjectLiteral(dataBindAttributeValue);
	        validateDataBindValuesForRewriting(dataBindKeyValueArray);
	        var rewrittenDataBindAttributeValue = ko.expressionRewriting.preProcessBindings(dataBindKeyValueArray, {'valueAccessors':true});
	
	        // For no obvious reason, Opera fails to evaluate rewrittenDataBindAttributeValue unless it's wrapped in an additional
	        // anonymous function, even though Opera's built-in debugger can evaluate it anyway. No other browser requires this
	        // extra indirection.
	        var applyBindingsToNextSiblingScript =
	            "ko.__tr_ambtns(function($context,$element){return(function(){return{ " + rewrittenDataBindAttributeValue + " } })()},'" + nodeName.toLowerCase() + "')";
	        return templateEngine['createJavaScriptEvaluatorBlock'](applyBindingsToNextSiblingScript) + tagToRetain;
	    }
	
	    return {
	        ensureTemplateIsRewritten: function (template, templateEngine, templateDocument) {
	            if (!templateEngine['isTemplateRewritten'](template, templateDocument))
	                templateEngine['rewriteTemplate'](template, function (htmlString) {
	                    return ko.templateRewriting.memoizeBindingAttributeSyntax(htmlString, templateEngine);
	                }, templateDocument);
	        },
	
	        memoizeBindingAttributeSyntax: function (htmlString, templateEngine) {
	            return htmlString.replace(memoizeDataBindingAttributeSyntaxRegex, function () {
	                return constructMemoizedTagReplacement(/* dataBindAttributeValue: */ arguments[4], /* tagToRetain: */ arguments[1], /* nodeName: */ arguments[2], templateEngine);
	            }).replace(memoizeVirtualContainerBindingSyntaxRegex, function() {
	                return constructMemoizedTagReplacement(/* dataBindAttributeValue: */ arguments[1], /* tagToRetain: */ "<!-- ko -->", /* nodeName: */ "#comment", templateEngine);
	            });
	        },
	
	        applyMemoizedBindingsToNextSibling: function (bindings, nodeName) {
	            return ko.memoization.memoize(function (domNode, bindingContext) {
	                var nodeToBind = domNode.nextSibling;
	                if (nodeToBind && nodeToBind.nodeName.toLowerCase() === nodeName) {
	                    ko.applyBindingAccessorsToNode(nodeToBind, bindings, bindingContext);
	                }
	            });
	        }
	    }
	})();
	
	
	// Exported only because it has to be referenced by string lookup from within rewritten template
	ko.exportSymbol('__tr_ambtns', ko.templateRewriting.applyMemoizedBindingsToNextSibling);
	(function() {
	    // A template source represents a read/write way of accessing a template. This is to eliminate the need for template loading/saving
	    // logic to be duplicated in every template engine (and means they can all work with anonymous templates, etc.)
	    //
	    // Two are provided by default:
	    //  1. ko.templateSources.domElement       - reads/writes the text content of an arbitrary DOM element
	    //  2. ko.templateSources.anonymousElement - uses ko.utils.domData to read/write text *associated* with the DOM element, but
	    //                                           without reading/writing the actual element text content, since it will be overwritten
	    //                                           with the rendered template output.
	    // You can implement your own template source if you want to fetch/store templates somewhere other than in DOM elements.
	    // Template sources need to have the following functions:
	    //   text() 			- returns the template text from your storage location
	    //   text(value)		- writes the supplied template text to your storage location
	    //   data(key)			- reads values stored using data(key, value) - see below
	    //   data(key, value)	- associates "value" with this template and the key "key". Is used to store information like "isRewritten".
	    //
	    // Optionally, template sources can also have the following functions:
	    //   nodes()            - returns a DOM element containing the nodes of this template, where available
	    //   nodes(value)       - writes the given DOM element to your storage location
	    // If a DOM element is available for a given template source, template engines are encouraged to use it in preference over text()
	    // for improved speed. However, all templateSources must supply text() even if they don't supply nodes().
	    //
	    // Once you've implemented a templateSource, make your template engine use it by subclassing whatever template engine you were
	    // using and overriding "makeTemplateSource" to return an instance of your custom template source.
	
	    ko.templateSources = {};
	
	    // ---- ko.templateSources.domElement -----
	
	    // template types
	    var templateScript = 1,
	        templateTextArea = 2,
	        templateTemplate = 3,
	        templateElement = 4;
	
	    ko.templateSources.domElement = function(element) {
	        this.domElement = element;
	
	        if (element) {
	            var tagNameLower = ko.utils.tagNameLower(element);
	            this.templateType =
	                tagNameLower === "script" ? templateScript :
	                tagNameLower === "textarea" ? templateTextArea :
	                    // For browsers with proper <template> element support, where the .content property gives a document fragment
	                tagNameLower == "template" && element.content && element.content.nodeType === 11 ? templateTemplate :
	                templateElement;
	        }
	    }
	
	    ko.templateSources.domElement.prototype['text'] = function(/* valueToWrite */) {
	        var elemContentsProperty = this.templateType === templateScript ? "text"
	                                 : this.templateType === templateTextArea ? "value"
	                                 : "innerHTML";
	
	        if (arguments.length == 0) {
	            return this.domElement[elemContentsProperty];
	        } else {
	            var valueToWrite = arguments[0];
	            if (elemContentsProperty === "innerHTML")
	                ko.utils.setHtml(this.domElement, valueToWrite);
	            else
	                this.domElement[elemContentsProperty] = valueToWrite;
	        }
	    };
	
	    var dataDomDataPrefix = ko.utils.domData.nextKey() + "_";
	    ko.templateSources.domElement.prototype['data'] = function(key /*, valueToWrite */) {
	        if (arguments.length === 1) {
	            return ko.utils.domData.get(this.domElement, dataDomDataPrefix + key);
	        } else {
	            ko.utils.domData.set(this.domElement, dataDomDataPrefix + key, arguments[1]);
	        }
	    };
	
	    var templatesDomDataKey = ko.utils.domData.nextKey();
	    function getTemplateDomData(element) {
	        return ko.utils.domData.get(element, templatesDomDataKey) || {};
	    }
	    function setTemplateDomData(element, data) {
	        ko.utils.domData.set(element, templatesDomDataKey, data);
	    }
	
	    ko.templateSources.domElement.prototype['nodes'] = function(/* valueToWrite */) {
	        var element = this.domElement;
	        if (arguments.length == 0) {
	            var templateData = getTemplateDomData(element),
	                containerData = templateData.containerData;
	            return containerData || (
	                this.templateType === templateTemplate ? element.content :
	                this.templateType === templateElement ? element :
	                undefined);
	        } else {
	            var valueToWrite = arguments[0];
	            setTemplateDomData(element, {containerData: valueToWrite});
	        }
	    };
	
	    // ---- ko.templateSources.anonymousTemplate -----
	    // Anonymous templates are normally saved/retrieved as DOM nodes through "nodes".
	    // For compatibility, you can also read "text"; it will be serialized from the nodes on demand.
	    // Writing to "text" is still supported, but then the template data will not be available as DOM nodes.
	
	    ko.templateSources.anonymousTemplate = function(element) {
	        this.domElement = element;
	    }
	    ko.templateSources.anonymousTemplate.prototype = new ko.templateSources.domElement();
	    ko.templateSources.anonymousTemplate.prototype.constructor = ko.templateSources.anonymousTemplate;
	    ko.templateSources.anonymousTemplate.prototype['text'] = function(/* valueToWrite */) {
	        if (arguments.length == 0) {
	            var templateData = getTemplateDomData(this.domElement);
	            if (templateData.textData === undefined && templateData.containerData)
	                templateData.textData = templateData.containerData.innerHTML;
	            return templateData.textData;
	        } else {
	            var valueToWrite = arguments[0];
	            setTemplateDomData(this.domElement, {textData: valueToWrite});
	        }
	    };
	
	    ko.exportSymbol('templateSources', ko.templateSources);
	    ko.exportSymbol('templateSources.domElement', ko.templateSources.domElement);
	    ko.exportSymbol('templateSources.anonymousTemplate', ko.templateSources.anonymousTemplate);
	})();
	(function () {
	    var _templateEngine;
	    ko.setTemplateEngine = function (templateEngine) {
	        if ((templateEngine != undefined) && !(templateEngine instanceof ko.templateEngine))
	            throw new Error("templateEngine must inherit from ko.templateEngine");
	        _templateEngine = templateEngine;
	    }
	
	    function invokeForEachNodeInContinuousRange(firstNode, lastNode, action) {
	        var node, nextInQueue = firstNode, firstOutOfRangeNode = ko.virtualElements.nextSibling(lastNode);
	        while (nextInQueue && ((node = nextInQueue) !== firstOutOfRangeNode)) {
	            nextInQueue = ko.virtualElements.nextSibling(node);
	            action(node, nextInQueue);
	        }
	    }
	
	    function activateBindingsOnContinuousNodeArray(continuousNodeArray, bindingContext) {
	        // To be used on any nodes that have been rendered by a template and have been inserted into some parent element
	        // Walks through continuousNodeArray (which *must* be continuous, i.e., an uninterrupted sequence of sibling nodes, because
	        // the algorithm for walking them relies on this), and for each top-level item in the virtual-element sense,
	        // (1) Does a regular "applyBindings" to associate bindingContext with this node and to activate any non-memoized bindings
	        // (2) Unmemoizes any memos in the DOM subtree (e.g., to activate bindings that had been memoized during template rewriting)
	
	        if (continuousNodeArray.length) {
	            var firstNode = continuousNodeArray[0],
	                lastNode = continuousNodeArray[continuousNodeArray.length - 1],
	                parentNode = firstNode.parentNode,
	                provider = ko.bindingProvider['instance'],
	                preprocessNode = provider['preprocessNode'];
	
	            if (preprocessNode) {
	                invokeForEachNodeInContinuousRange(firstNode, lastNode, function(node, nextNodeInRange) {
	                    var nodePreviousSibling = node.previousSibling;
	                    var newNodes = preprocessNode.call(provider, node);
	                    if (newNodes) {
	                        if (node === firstNode)
	                            firstNode = newNodes[0] || nextNodeInRange;
	                        if (node === lastNode)
	                            lastNode = newNodes[newNodes.length - 1] || nodePreviousSibling;
	                    }
	                });
	
	                // Because preprocessNode can change the nodes, including the first and last nodes, update continuousNodeArray to match.
	                // We need the full set, including inner nodes, because the unmemoize step might remove the first node (and so the real
	                // first node needs to be in the array).
	                continuousNodeArray.length = 0;
	                if (!firstNode) { // preprocessNode might have removed all the nodes, in which case there's nothing left to do
	                    return;
	                }
	                if (firstNode === lastNode) {
	                    continuousNodeArray.push(firstNode);
	                } else {
	                    continuousNodeArray.push(firstNode, lastNode);
	                    ko.utils.fixUpContinuousNodeArray(continuousNodeArray, parentNode);
	                }
	            }
	
	            // Need to applyBindings *before* unmemoziation, because unmemoization might introduce extra nodes (that we don't want to re-bind)
	            // whereas a regular applyBindings won't introduce new memoized nodes
	            invokeForEachNodeInContinuousRange(firstNode, lastNode, function(node) {
	                if (node.nodeType === 1 || node.nodeType === 8)
	                    ko.applyBindings(bindingContext, node);
	            });
	            invokeForEachNodeInContinuousRange(firstNode, lastNode, function(node) {
	                if (node.nodeType === 1 || node.nodeType === 8)
	                    ko.memoization.unmemoizeDomNodeAndDescendants(node, [bindingContext]);
	            });
	
	            // Make sure any changes done by applyBindings or unmemoize are reflected in the array
	            ko.utils.fixUpContinuousNodeArray(continuousNodeArray, parentNode);
	        }
	    }
	
	    function getFirstNodeFromPossibleArray(nodeOrNodeArray) {
	        return nodeOrNodeArray.nodeType ? nodeOrNodeArray
	                                        : nodeOrNodeArray.length > 0 ? nodeOrNodeArray[0]
	                                        : null;
	    }
	
	    function executeTemplate(targetNodeOrNodeArray, renderMode, template, bindingContext, options) {
	        options = options || {};
	        var firstTargetNode = targetNodeOrNodeArray && getFirstNodeFromPossibleArray(targetNodeOrNodeArray);
	        var templateDocument = (firstTargetNode || template || {}).ownerDocument;
	        var templateEngineToUse = (options['templateEngine'] || _templateEngine);
	        ko.templateRewriting.ensureTemplateIsRewritten(template, templateEngineToUse, templateDocument);
	        var renderedNodesArray = templateEngineToUse['renderTemplate'](template, bindingContext, options, templateDocument);
	
	        // Loosely check result is an array of DOM nodes
	        if ((typeof renderedNodesArray.length != "number") || (renderedNodesArray.length > 0 && typeof renderedNodesArray[0].nodeType != "number"))
	            throw new Error("Template engine must return an array of DOM nodes");
	
	        var haveAddedNodesToParent = false;
	        switch (renderMode) {
	            case "replaceChildren":
	                ko.virtualElements.setDomNodeChildren(targetNodeOrNodeArray, renderedNodesArray);
	                haveAddedNodesToParent = true;
	                break;
	            case "replaceNode":
	                ko.utils.replaceDomNodes(targetNodeOrNodeArray, renderedNodesArray);
	                haveAddedNodesToParent = true;
	                break;
	            case "ignoreTargetNode": break;
	            default:
	                throw new Error("Unknown renderMode: " + renderMode);
	        }
	
	        if (haveAddedNodesToParent) {
	            activateBindingsOnContinuousNodeArray(renderedNodesArray, bindingContext);
	            if (options['afterRender'])
	                ko.dependencyDetection.ignore(options['afterRender'], null, [renderedNodesArray, bindingContext['$data']]);
	        }
	
	        return renderedNodesArray;
	    }
	
	    function resolveTemplateName(template, data, context) {
	        // The template can be specified as:
	        if (ko.isObservable(template)) {
	            // 1. An observable, with string value
	            return template();
	        } else if (typeof template === 'function') {
	            // 2. A function of (data, context) returning a string
	            return template(data, context);
	        } else {
	            // 3. A string
	            return template;
	        }
	    }
	
	    ko.renderTemplate = function (template, dataOrBindingContext, options, targetNodeOrNodeArray, renderMode) {
	        options = options || {};
	        if ((options['templateEngine'] || _templateEngine) == undefined)
	            throw new Error("Set a template engine before calling renderTemplate");
	        renderMode = renderMode || "replaceChildren";
	
	        if (targetNodeOrNodeArray) {
	            var firstTargetNode = getFirstNodeFromPossibleArray(targetNodeOrNodeArray);
	
	            var whenToDispose = function () { return (!firstTargetNode) || !ko.utils.domNodeIsAttachedToDocument(firstTargetNode); }; // Passive disposal (on next evaluation)
	            var activelyDisposeWhenNodeIsRemoved = (firstTargetNode && renderMode == "replaceNode") ? firstTargetNode.parentNode : firstTargetNode;
	
	            return ko.dependentObservable( // So the DOM is automatically updated when any dependency changes
	                function () {
	                    // Ensure we've got a proper binding context to work with
	                    var bindingContext = (dataOrBindingContext && (dataOrBindingContext instanceof ko.bindingContext))
	                        ? dataOrBindingContext
	                        : new ko.bindingContext(dataOrBindingContext, null, null, null, { "exportDependencies": true });
	
	                    var templateName = resolveTemplateName(template, bindingContext['$data'], bindingContext),
	                        renderedNodesArray = executeTemplate(targetNodeOrNodeArray, renderMode, templateName, bindingContext, options);
	
	                    if (renderMode == "replaceNode") {
	                        targetNodeOrNodeArray = renderedNodesArray;
	                        firstTargetNode = getFirstNodeFromPossibleArray(targetNodeOrNodeArray);
	                    }
	                },
	                null,
	                { disposeWhen: whenToDispose, disposeWhenNodeIsRemoved: activelyDisposeWhenNodeIsRemoved }
	            );
	        } else {
	            // We don't yet have a DOM node to evaluate, so use a memo and render the template later when there is a DOM node
	            return ko.memoization.memoize(function (domNode) {
	                ko.renderTemplate(template, dataOrBindingContext, options, domNode, "replaceNode");
	            });
	        }
	    };
	
	    ko.renderTemplateForEach = function (template, arrayOrObservableArray, options, targetNode, parentBindingContext) {
	        // Since setDomNodeChildrenFromArrayMapping always calls executeTemplateForArrayItem and then
	        // activateBindingsCallback for added items, we can store the binding context in the former to use in the latter.
	        var arrayItemContext;
	
	        // This will be called by setDomNodeChildrenFromArrayMapping to get the nodes to add to targetNode
	        var executeTemplateForArrayItem = function (arrayValue, index) {
	            // Support selecting template as a function of the data being rendered
	            arrayItemContext = parentBindingContext['createChildContext'](arrayValue, options['as'], function(context) {
	                context['$index'] = index;
	            });
	
	            var templateName = resolveTemplateName(template, arrayValue, arrayItemContext);
	            return executeTemplate(null, "ignoreTargetNode", templateName, arrayItemContext, options);
	        }
	
	        // This will be called whenever setDomNodeChildrenFromArrayMapping has added nodes to targetNode
	        var activateBindingsCallback = function(arrayValue, addedNodesArray, index) {
	            activateBindingsOnContinuousNodeArray(addedNodesArray, arrayItemContext);
	            if (options['afterRender'])
	                options['afterRender'](addedNodesArray, arrayValue);
	
	            // release the "cache" variable, so that it can be collected by
	            // the GC when its value isn't used from within the bindings anymore.
	            arrayItemContext = null;
	        };
	
	        return ko.dependentObservable(function () {
	            var unwrappedArray = ko.utils.unwrapObservable(arrayOrObservableArray) || [];
	            if (typeof unwrappedArray.length == "undefined") // Coerce single value into array
	                unwrappedArray = [unwrappedArray];
	
	            // Filter out any entries marked as destroyed
	            var filteredArray = ko.utils.arrayFilter(unwrappedArray, function(item) {
	                return options['includeDestroyed'] || item === undefined || item === null || !ko.utils.unwrapObservable(item['_destroy']);
	            });
	
	            // Call setDomNodeChildrenFromArrayMapping, ignoring any observables unwrapped within (most likely from a callback function).
	            // If the array items are observables, though, they will be unwrapped in executeTemplateForArrayItem and managed within setDomNodeChildrenFromArrayMapping.
	            ko.dependencyDetection.ignore(ko.utils.setDomNodeChildrenFromArrayMapping, null, [targetNode, filteredArray, executeTemplateForArrayItem, options, activateBindingsCallback]);
	
	        }, null, { disposeWhenNodeIsRemoved: targetNode });
	    };
	
	    var templateComputedDomDataKey = ko.utils.domData.nextKey();
	    function disposeOldComputedAndStoreNewOne(element, newComputed) {
	        var oldComputed = ko.utils.domData.get(element, templateComputedDomDataKey);
	        if (oldComputed && (typeof(oldComputed.dispose) == 'function'))
	            oldComputed.dispose();
	        ko.utils.domData.set(element, templateComputedDomDataKey, (newComputed && newComputed.isActive()) ? newComputed : undefined);
	    }
	
	    ko.bindingHandlers['template'] = {
	        'init': function(element, valueAccessor) {
	            // Support anonymous templates
	            var bindingValue = ko.utils.unwrapObservable(valueAccessor());
	            if (typeof bindingValue == "string" || bindingValue['name']) {
	                // It's a named template - clear the element
	                ko.virtualElements.emptyNode(element);
	            } else if ('nodes' in bindingValue) {
	                // We've been given an array of DOM nodes. Save them as the template source.
	                // There is no known use case for the node array being an observable array (if the output
	                // varies, put that behavior *into* your template - that's what templates are for), and
	                // the implementation would be a mess, so assert that it's not observable.
	                var nodes = bindingValue['nodes'] || [];
	                if (ko.isObservable(nodes)) {
	                    throw new Error('The "nodes" option must be a plain, non-observable array.');
	                }
	                var container = ko.utils.moveCleanedNodesToContainerElement(nodes); // This also removes the nodes from their current parent
	                new ko.templateSources.anonymousTemplate(element)['nodes'](container);
	            } else {
	                // It's an anonymous template - store the element contents, then clear the element
	                var templateNodes = ko.virtualElements.childNodes(element),
	                    container = ko.utils.moveCleanedNodesToContainerElement(templateNodes); // This also removes the nodes from their current parent
	                new ko.templateSources.anonymousTemplate(element)['nodes'](container);
	            }
	            return { 'controlsDescendantBindings': true };
	        },
	        'update': function (element, valueAccessor, allBindings, viewModel, bindingContext) {
	            var value = valueAccessor(),
	                options = ko.utils.unwrapObservable(value),
	                shouldDisplay = true,
	                templateComputed = null,
	                templateName;
	
	            if (typeof options == "string") {
	                templateName = value;
	                options = {};
	            } else {
	                templateName = options['name'];
	
	                // Support "if"/"ifnot" conditions
	                if ('if' in options)
	                    shouldDisplay = ko.utils.unwrapObservable(options['if']);
	                if (shouldDisplay && 'ifnot' in options)
	                    shouldDisplay = !ko.utils.unwrapObservable(options['ifnot']);
	            }
	
	            if ('foreach' in options) {
	                // Render once for each data point (treating data set as empty if shouldDisplay==false)
	                var dataArray = (shouldDisplay && options['foreach']) || [];
	                templateComputed = ko.renderTemplateForEach(templateName || element, dataArray, options, element, bindingContext);
	            } else if (!shouldDisplay) {
	                ko.virtualElements.emptyNode(element);
	            } else {
	                // Render once for this single data point (or use the viewModel if no data was provided)
	                var innerBindingContext = ('data' in options) ?
	                    bindingContext.createStaticChildContext(options['data'], options['as']) :  // Given an explitit 'data' value, we create a child binding context for it
	                    bindingContext;                                                        // Given no explicit 'data' value, we retain the same binding context
	                templateComputed = ko.renderTemplate(templateName || element, innerBindingContext, options, element);
	            }
	
	            // It only makes sense to have a single template computed per element (otherwise which one should have its output displayed?)
	            disposeOldComputedAndStoreNewOne(element, templateComputed);
	        }
	    };
	
	    // Anonymous templates can't be rewritten. Give a nice error message if you try to do it.
	    ko.expressionRewriting.bindingRewriteValidators['template'] = function(bindingValue) {
	        var parsedBindingValue = ko.expressionRewriting.parseObjectLiteral(bindingValue);
	
	        if ((parsedBindingValue.length == 1) && parsedBindingValue[0]['unknown'])
	            return null; // It looks like a string literal, not an object literal, so treat it as a named template (which is allowed for rewriting)
	
	        if (ko.expressionRewriting.keyValueArrayContainsKey(parsedBindingValue, "name"))
	            return null; // Named templates can be rewritten, so return "no error"
	        return "This template engine does not support anonymous templates nested within its templates";
	    };
	
	    ko.virtualElements.allowedBindings['template'] = true;
	})();
	
	ko.exportSymbol('setTemplateEngine', ko.setTemplateEngine);
	ko.exportSymbol('renderTemplate', ko.renderTemplate);
	// Go through the items that have been added and deleted and try to find matches between them.
	ko.utils.findMovesInArrayComparison = function (left, right, limitFailedCompares) {
	    if (left.length && right.length) {
	        var failedCompares, l, r, leftItem, rightItem;
	        for (failedCompares = l = 0; (!limitFailedCompares || failedCompares < limitFailedCompares) && (leftItem = left[l]); ++l) {
	            for (r = 0; rightItem = right[r]; ++r) {
	                if (leftItem['value'] === rightItem['value']) {
	                    leftItem['moved'] = rightItem['index'];
	                    rightItem['moved'] = leftItem['index'];
	                    right.splice(r, 1);         // This item is marked as moved; so remove it from right list
	                    failedCompares = r = 0;     // Reset failed compares count because we're checking for consecutive failures
	                    break;
	                }
	            }
	            failedCompares += r;
	        }
	    }
	};
	
	ko.utils.compareArrays = (function () {
	    var statusNotInOld = 'added', statusNotInNew = 'deleted';
	
	    // Simple calculation based on Levenshtein distance.
	    function compareArrays(oldArray, newArray, options) {
	        // For backward compatibility, if the third arg is actually a bool, interpret
	        // it as the old parameter 'dontLimitMoves'. Newer code should use { dontLimitMoves: true }.
	        options = (typeof options === 'boolean') ? { 'dontLimitMoves': options } : (options || {});
	        oldArray = oldArray || [];
	        newArray = newArray || [];
	
	        if (oldArray.length < newArray.length)
	            return compareSmallArrayToBigArray(oldArray, newArray, statusNotInOld, statusNotInNew, options);
	        else
	            return compareSmallArrayToBigArray(newArray, oldArray, statusNotInNew, statusNotInOld, options);
	    }
	
	    function compareSmallArrayToBigArray(smlArray, bigArray, statusNotInSml, statusNotInBig, options) {
	        var myMin = Math.min,
	            myMax = Math.max,
	            editDistanceMatrix = [],
	            smlIndex, smlIndexMax = smlArray.length,
	            bigIndex, bigIndexMax = bigArray.length,
	            compareRange = (bigIndexMax - smlIndexMax) || 1,
	            maxDistance = smlIndexMax + bigIndexMax + 1,
	            thisRow, lastRow,
	            bigIndexMaxForRow, bigIndexMinForRow;
	
	        for (smlIndex = 0; smlIndex <= smlIndexMax; smlIndex++) {
	            lastRow = thisRow;
	            editDistanceMatrix.push(thisRow = []);
	            bigIndexMaxForRow = myMin(bigIndexMax, smlIndex + compareRange);
	            bigIndexMinForRow = myMax(0, smlIndex - 1);
	            for (bigIndex = bigIndexMinForRow; bigIndex <= bigIndexMaxForRow; bigIndex++) {
	                if (!bigIndex)
	                    thisRow[bigIndex] = smlIndex + 1;
	                else if (!smlIndex)  // Top row - transform empty array into new array via additions
	                    thisRow[bigIndex] = bigIndex + 1;
	                else if (smlArray[smlIndex - 1] === bigArray[bigIndex - 1])
	                    thisRow[bigIndex] = lastRow[bigIndex - 1];                  // copy value (no edit)
	                else {
	                    var northDistance = lastRow[bigIndex] || maxDistance;       // not in big (deletion)
	                    var westDistance = thisRow[bigIndex - 1] || maxDistance;    // not in small (addition)
	                    thisRow[bigIndex] = myMin(northDistance, westDistance) + 1;
	                }
	            }
	        }
	
	        var editScript = [], meMinusOne, notInSml = [], notInBig = [];
	        for (smlIndex = smlIndexMax, bigIndex = bigIndexMax; smlIndex || bigIndex;) {
	            meMinusOne = editDistanceMatrix[smlIndex][bigIndex] - 1;
	            if (bigIndex && meMinusOne === editDistanceMatrix[smlIndex][bigIndex-1]) {
	                notInSml.push(editScript[editScript.length] = {     // added
	                    'status': statusNotInSml,
	                    'value': bigArray[--bigIndex],
	                    'index': bigIndex });
	            } else if (smlIndex && meMinusOne === editDistanceMatrix[smlIndex - 1][bigIndex]) {
	                notInBig.push(editScript[editScript.length] = {     // deleted
	                    'status': statusNotInBig,
	                    'value': smlArray[--smlIndex],
	                    'index': smlIndex });
	            } else {
	                --bigIndex;
	                --smlIndex;
	                if (!options['sparse']) {
	                    editScript.push({
	                        'status': "retained",
	                        'value': bigArray[bigIndex] });
	                }
	            }
	        }
	
	        // Set a limit on the number of consecutive non-matching comparisons; having it a multiple of
	        // smlIndexMax keeps the time complexity of this algorithm linear.
	        ko.utils.findMovesInArrayComparison(notInBig, notInSml, !options['dontLimitMoves'] && smlIndexMax * 10);
	
	        return editScript.reverse();
	    }
	
	    return compareArrays;
	})();
	
	ko.exportSymbol('utils.compareArrays', ko.utils.compareArrays);
	(function () {
	    // Objective:
	    // * Given an input array, a container DOM node, and a function from array elements to arrays of DOM nodes,
	    //   map the array elements to arrays of DOM nodes, concatenate together all these arrays, and use them to populate the container DOM node
	    // * Next time we're given the same combination of things (with the array possibly having mutated), update the container DOM node
	    //   so that its children is again the concatenation of the mappings of the array elements, but don't re-map any array elements that we
	    //   previously mapped - retain those nodes, and just insert/delete other ones
	
	    // "callbackAfterAddingNodes" will be invoked after any "mapping"-generated nodes are inserted into the container node
	    // You can use this, for example, to activate bindings on those nodes.
	
	    function mapNodeAndRefreshWhenChanged(containerNode, mapping, valueToMap, callbackAfterAddingNodes, index) {
	        // Map this array value inside a dependentObservable so we re-map when any dependency changes
	        var mappedNodes = [];
	        var dependentObservable = ko.dependentObservable(function() {
	            var newMappedNodes = mapping(valueToMap, index, ko.utils.fixUpContinuousNodeArray(mappedNodes, containerNode)) || [];
	
	            // On subsequent evaluations, just replace the previously-inserted DOM nodes
	            if (mappedNodes.length > 0) {
	                ko.utils.replaceDomNodes(mappedNodes, newMappedNodes);
	                if (callbackAfterAddingNodes)
	                    ko.dependencyDetection.ignore(callbackAfterAddingNodes, null, [valueToMap, newMappedNodes, index]);
	            }
	
	            // Replace the contents of the mappedNodes array, thereby updating the record
	            // of which nodes would be deleted if valueToMap was itself later removed
	            mappedNodes.length = 0;
	            ko.utils.arrayPushAll(mappedNodes, newMappedNodes);
	        }, null, { disposeWhenNodeIsRemoved: containerNode, disposeWhen: function() { return !ko.utils.anyDomNodeIsAttachedToDocument(mappedNodes); } });
	        return { mappedNodes : mappedNodes, dependentObservable : (dependentObservable.isActive() ? dependentObservable : undefined) };
	    }
	
	    var lastMappingResultDomDataKey = ko.utils.domData.nextKey(),
	        deletedItemDummyValue = ko.utils.domData.nextKey();
	
	    ko.utils.setDomNodeChildrenFromArrayMapping = function (domNode, array, mapping, options, callbackAfterAddingNodes) {
	        // Compare the provided array against the previous one
	        array = array || [];
	        options = options || {};
	        var isFirstExecution = ko.utils.domData.get(domNode, lastMappingResultDomDataKey) === undefined;
	        var lastMappingResult = ko.utils.domData.get(domNode, lastMappingResultDomDataKey) || [];
	        var lastArray = ko.utils.arrayMap(lastMappingResult, function (x) { return x.arrayEntry; });
	        var editScript = ko.utils.compareArrays(lastArray, array, options['dontLimitMoves']);
	
	        // Build the new mapping result
	        var newMappingResult = [];
	        var lastMappingResultIndex = 0;
	        var newMappingResultIndex = 0;
	
	        var nodesToDelete = [];
	        var itemsToProcess = [];
	        var itemsForBeforeRemoveCallbacks = [];
	        var itemsForMoveCallbacks = [];
	        var itemsForAfterAddCallbacks = [];
	        var mapData;
	
	        function itemMovedOrRetained(editScriptIndex, oldPosition) {
	            mapData = lastMappingResult[oldPosition];
	            if (newMappingResultIndex !== oldPosition)
	                itemsForMoveCallbacks[editScriptIndex] = mapData;
	            // Since updating the index might change the nodes, do so before calling fixUpContinuousNodeArray
	            mapData.indexObservable(newMappingResultIndex++);
	            ko.utils.fixUpContinuousNodeArray(mapData.mappedNodes, domNode);
	            newMappingResult.push(mapData);
	            itemsToProcess.push(mapData);
	        }
	
	        function callCallback(callback, items) {
	            if (callback) {
	                for (var i = 0, n = items.length; i < n; i++) {
	                    if (items[i]) {
	                        ko.utils.arrayForEach(items[i].mappedNodes, function(node) {
	                            callback(node, i, items[i].arrayEntry);
	                        });
	                    }
	                }
	            }
	        }
	
	        for (var i = 0, editScriptItem, movedIndex; editScriptItem = editScript[i]; i++) {
	            movedIndex = editScriptItem['moved'];
	            switch (editScriptItem['status']) {
	                case "deleted":
	                    if (movedIndex === undefined) {
	                        mapData = lastMappingResult[lastMappingResultIndex];
	
	                        // Stop tracking changes to the mapping for these nodes
	                        if (mapData.dependentObservable) {
	                            mapData.dependentObservable.dispose();
	                            mapData.dependentObservable = undefined;
	                        }
	
	                        // Queue these nodes for later removal
	                        if (ko.utils.fixUpContinuousNodeArray(mapData.mappedNodes, domNode).length) {
	                            if (options['beforeRemove']) {
	                                newMappingResult.push(mapData);
	                                itemsToProcess.push(mapData);
	                                if (mapData.arrayEntry === deletedItemDummyValue) {
	                                    mapData = null;
	                                } else {
	                                    itemsForBeforeRemoveCallbacks[i] = mapData;
	                                }
	                            }
	                            if (mapData) {
	                                nodesToDelete.push.apply(nodesToDelete, mapData.mappedNodes);
	                            }
	                        }
	                    }
	                    lastMappingResultIndex++;
	                    break;
	
	                case "retained":
	                    itemMovedOrRetained(i, lastMappingResultIndex++);
	                    break;
	
	                case "added":
	                    if (movedIndex !== undefined) {
	                        itemMovedOrRetained(i, movedIndex);
	                    } else {
	                        mapData = { arrayEntry: editScriptItem['value'], indexObservable: ko.observable(newMappingResultIndex++) };
	                        newMappingResult.push(mapData);
	                        itemsToProcess.push(mapData);
	                        if (!isFirstExecution)
	                            itemsForAfterAddCallbacks[i] = mapData;
	                    }
	                    break;
	            }
	        }
	
	        // Store a copy of the array items we just considered so we can difference it next time
	        ko.utils.domData.set(domNode, lastMappingResultDomDataKey, newMappingResult);
	
	        // Call beforeMove first before any changes have been made to the DOM
	        callCallback(options['beforeMove'], itemsForMoveCallbacks);
	
	        // Next remove nodes for deleted items (or just clean if there's a beforeRemove callback)
	        ko.utils.arrayForEach(nodesToDelete, options['beforeRemove'] ? ko.cleanNode : ko.removeNode);
	
	        // Next add/reorder the remaining items (will include deleted items if there's a beforeRemove callback)
	        for (var i = 0, nextNode = ko.virtualElements.firstChild(domNode), lastNode, node; mapData = itemsToProcess[i]; i++) {
	            // Get nodes for newly added items
	            if (!mapData.mappedNodes)
	                ko.utils.extend(mapData, mapNodeAndRefreshWhenChanged(domNode, mapping, mapData.arrayEntry, callbackAfterAddingNodes, mapData.indexObservable));
	
	            // Put nodes in the right place if they aren't there already
	            for (var j = 0; node = mapData.mappedNodes[j]; nextNode = node.nextSibling, lastNode = node, j++) {
	                if (node !== nextNode)
	                    ko.virtualElements.insertAfter(domNode, node, lastNode);
	            }
	
	            // Run the callbacks for newly added nodes (for example, to apply bindings, etc.)
	            if (!mapData.initialized && callbackAfterAddingNodes) {
	                callbackAfterAddingNodes(mapData.arrayEntry, mapData.mappedNodes, mapData.indexObservable);
	                mapData.initialized = true;
	            }
	        }
	
	        // If there's a beforeRemove callback, call it after reordering.
	        // Note that we assume that the beforeRemove callback will usually be used to remove the nodes using
	        // some sort of animation, which is why we first reorder the nodes that will be removed. If the
	        // callback instead removes the nodes right away, it would be more efficient to skip reordering them.
	        // Perhaps we'll make that change in the future if this scenario becomes more common.
	        callCallback(options['beforeRemove'], itemsForBeforeRemoveCallbacks);
	
	        // Replace the stored values of deleted items with a dummy value. This provides two benefits: it marks this item
	        // as already "removed" so we won't call beforeRemove for it again, and it ensures that the item won't match up
	        // with an actual item in the array and appear as "retained" or "moved".
	        for (i = 0; i < itemsForBeforeRemoveCallbacks.length; ++i) {
	            if (itemsForBeforeRemoveCallbacks[i]) {
	                itemsForBeforeRemoveCallbacks[i].arrayEntry = deletedItemDummyValue;
	            }
	        }
	
	        // Finally call afterMove and afterAdd callbacks
	        callCallback(options['afterMove'], itemsForMoveCallbacks);
	        callCallback(options['afterAdd'], itemsForAfterAddCallbacks);
	    }
	})();
	
	ko.exportSymbol('utils.setDomNodeChildrenFromArrayMapping', ko.utils.setDomNodeChildrenFromArrayMapping);
	ko.nativeTemplateEngine = function () {
	    this['allowTemplateRewriting'] = false;
	}
	
	ko.nativeTemplateEngine.prototype = new ko.templateEngine();
	ko.nativeTemplateEngine.prototype.constructor = ko.nativeTemplateEngine;
	ko.nativeTemplateEngine.prototype['renderTemplateSource'] = function (templateSource, bindingContext, options, templateDocument) {
	    var useNodesIfAvailable = !(ko.utils.ieVersion < 9), // IE<9 cloneNode doesn't work properly
	        templateNodesFunc = useNodesIfAvailable ? templateSource['nodes'] : null,
	        templateNodes = templateNodesFunc ? templateSource['nodes']() : null;
	
	    if (templateNodes) {
	        return ko.utils.makeArray(templateNodes.cloneNode(true).childNodes);
	    } else {
	        var templateText = templateSource['text']();
	        return ko.utils.parseHtmlFragment(templateText, templateDocument);
	    }
	};
	
	ko.nativeTemplateEngine.instance = new ko.nativeTemplateEngine();
	ko.setTemplateEngine(ko.nativeTemplateEngine.instance);
	
	ko.exportSymbol('nativeTemplateEngine', ko.nativeTemplateEngine);
	(function() {
	    ko.jqueryTmplTemplateEngine = function () {
	        // Detect which version of jquery-tmpl you're using. Unfortunately jquery-tmpl
	        // doesn't expose a version number, so we have to infer it.
	        // Note that as of Knockout 1.3, we only support jQuery.tmpl 1.0.0pre and later,
	        // which KO internally refers to as version "2", so older versions are no longer detected.
	        var jQueryTmplVersion = this.jQueryTmplVersion = (function() {
	            if (!jQueryInstance || !(jQueryInstance['tmpl']))
	                return 0;
	            // Since it exposes no official version number, we use our own numbering system. To be updated as jquery-tmpl evolves.
	            try {
	                if (jQueryInstance['tmpl']['tag']['tmpl']['open'].toString().indexOf('__') >= 0) {
	                    // Since 1.0.0pre, custom tags should append markup to an array called "__"
	                    return 2; // Final version of jquery.tmpl
	                }
	            } catch(ex) { /* Apparently not the version we were looking for */ }
	
	            return 1; // Any older version that we don't support
	        })();
	
	        function ensureHasReferencedJQueryTemplates() {
	            if (jQueryTmplVersion < 2)
	                throw new Error("Your version of jQuery.tmpl is too old. Please upgrade to jQuery.tmpl 1.0.0pre or later.");
	        }
	
	        function executeTemplate(compiledTemplate, data, jQueryTemplateOptions) {
	            return jQueryInstance['tmpl'](compiledTemplate, data, jQueryTemplateOptions);
	        }
	
	        this['renderTemplateSource'] = function(templateSource, bindingContext, options, templateDocument) {
	            templateDocument = templateDocument || document;
	            options = options || {};
	            ensureHasReferencedJQueryTemplates();
	
	            // Ensure we have stored a precompiled version of this template (don't want to reparse on every render)
	            var precompiled = templateSource['data']('precompiled');
	            if (!precompiled) {
	                var templateText = templateSource['text']() || "";
	                // Wrap in "with($whatever.koBindingContext) { ... }"
	                templateText = "{{ko_with $item.koBindingContext}}" + templateText + "{{/ko_with}}";
	
	                precompiled = jQueryInstance['template'](null, templateText);
	                templateSource['data']('precompiled', precompiled);
	            }
	
	            var data = [bindingContext['$data']]; // Prewrap the data in an array to stop jquery.tmpl from trying to unwrap any arrays
	            var jQueryTemplateOptions = jQueryInstance['extend']({ 'koBindingContext': bindingContext }, options['templateOptions']);
	
	            var resultNodes = executeTemplate(precompiled, data, jQueryTemplateOptions);
	            resultNodes['appendTo'](templateDocument.createElement("div")); // Using "appendTo" forces jQuery/jQuery.tmpl to perform necessary cleanup work
	
	            jQueryInstance['fragments'] = {}; // Clear jQuery's fragment cache to avoid a memory leak after a large number of template renders
	            return resultNodes;
	        };
	
	        this['createJavaScriptEvaluatorBlock'] = function(script) {
	            return "{{ko_code ((function() { return " + script + " })()) }}";
	        };
	
	        this['addTemplate'] = function(templateName, templateMarkup) {
	            document.write("<script type='text/html' id='" + templateName + "'>" + templateMarkup + "<" + "/script>");
	        };
	
	        if (jQueryTmplVersion > 0) {
	            jQueryInstance['tmpl']['tag']['ko_code'] = {
	                open: "__.push($1 || '');"
	            };
	            jQueryInstance['tmpl']['tag']['ko_with'] = {
	                open: "with($1) {",
	                close: "} "
	            };
	        }
	    };
	
	    ko.jqueryTmplTemplateEngine.prototype = new ko.templateEngine();
	    ko.jqueryTmplTemplateEngine.prototype.constructor = ko.jqueryTmplTemplateEngine;
	
	    // Use this one by default *only if jquery.tmpl is referenced*
	    var jqueryTmplTemplateEngineInstance = new ko.jqueryTmplTemplateEngine();
	    if (jqueryTmplTemplateEngineInstance.jQueryTmplVersion > 0)
	        ko.setTemplateEngine(jqueryTmplTemplateEngineInstance);
	
	    ko.exportSymbol('jqueryTmplTemplateEngine', ko.jqueryTmplTemplateEngine);
	})();
	}));
	}());
	})();
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	var util_1 = __webpack_require__(5);
	var storage_1 = __webpack_require__(6);
	var configuration_1 = __webpack_require__(7);
	var logging_1 = __webpack_require__(12);
	var rest_1 = __webpack_require__(13);
	var pnplibconfig_1 = __webpack_require__(20);
	/**
	 * Root class of the Patterns and Practices namespace, provides an entry point to the library
	 */
	/**
	 * Utility methods
	 */
	exports.util = util_1.Util;
	/**
	 * Provides access to the REST interface
	 */
	exports.sp = new rest_1.Rest();
	/**
	 * Provides access to local and session storage
	 */
	exports.storage = new storage_1.PnPClientStorage();
	/**
	 * Global configuration instance to which providers can be added
	 */
	exports.config = new configuration_1.Settings();
	/**
	 * Global logging instance to which subscribers can be registered and messages written
	 */
	exports.log = logging_1.Logger;
	/**
	 * Allows for the configuration of the library
	 */
	exports.setup = pnplibconfig_1.setRuntimeConfig;
	/**
	 * Expose a subset of classes from the library for public consumption
	 */
	__export(__webpack_require__(47));
	// creating this class instead of directly assigning to default fixes issue #116
	var Def = {
	    /**
	     * Global configuration instance to which providers can be added
	     */
	    config: exports.config,
	    /**
	     * Global logging instance to which subscribers can be registered and messages written
	     */
	    log: exports.log,
	    /**
	     * Provides access to local and session storage
	     */
	    setup: exports.setup,
	    /**
	     * Provides access to the REST interface
	     */
	    sp: exports.sp,
	    /**
	     * Provides access to local and session storage
	     */
	    storage: exports.storage,
	    /**
	     * Utility methods
	     */
	    util: exports.util,
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Def;


/***/ },
/* 5 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	var Util = (function () {
	    function Util() {
	    }
	    /**
	     * Gets a callback function which will maintain context across async calls.
	     * Allows for the calling pattern getCtxCallback(thisobj, method, methodarg1, methodarg2, ...)
	     *
	     * @param context The object that will be the 'this' value in the callback
	     * @param method The method to which we will apply the context and parameters
	     * @param params Optional, additional arguments to supply to the wrapped method when it is invoked
	     */
	    Util.getCtxCallback = function (context, method) {
	        var params = [];
	        for (var _i = 2; _i < arguments.length; _i++) {
	            params[_i - 2] = arguments[_i];
	        }
	        return function () {
	            method.apply(context, params);
	        };
	    };
	    /**
	     * Tests if a url param exists
	     *
	     * @param name The name of the url paramter to check
	     */
	    Util.urlParamExists = function (name) {
	        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
	        return regex.test(location.search);
	    };
	    /**
	     * Gets a url param value by name
	     *
	     * @param name The name of the paramter for which we want the value
	     */
	    Util.getUrlParamByName = function (name) {
	        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
	        var results = regex.exec(location.search);
	        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	    };
	    /**
	     * Gets a url param by name and attempts to parse a bool value
	     *
	     * @param name The name of the paramter for which we want the boolean value
	     */
	    Util.getUrlParamBoolByName = function (name) {
	        var p = this.getUrlParamByName(name);
	        var isFalse = (p === "" || /false|0/i.test(p));
	        return !isFalse;
	    };
	    /**
	     * Inserts the string s into the string target as the index specified by index
	     *
	     * @param target The string into which we will insert s
	     * @param index The location in target to insert s (zero based)
	     * @param s The string to insert into target at position index
	     */
	    Util.stringInsert = function (target, index, s) {
	        if (index > 0) {
	            return target.substring(0, index) + s + target.substring(index, target.length);
	        }
	        return s + target;
	    };
	    /**
	     * Adds a value to a date
	     *
	     * @param date The date to which we will add units, done in local time
	     * @param interval The name of the interval to add, one of: ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second']
	     * @param units The amount to add to date of the given interval
	     *
	     * http://stackoverflow.com/questions/1197928/how-to-add-30-minutes-to-a-javascript-date-object
	     */
	    Util.dateAdd = function (date, interval, units) {
	        var ret = new Date(date.toLocaleString()); // don't change original date
	        switch (interval.toLowerCase()) {
	            case "year":
	                ret.setFullYear(ret.getFullYear() + units);
	                break;
	            case "quarter":
	                ret.setMonth(ret.getMonth() + 3 * units);
	                break;
	            case "month":
	                ret.setMonth(ret.getMonth() + units);
	                break;
	            case "week":
	                ret.setDate(ret.getDate() + 7 * units);
	                break;
	            case "day":
	                ret.setDate(ret.getDate() + units);
	                break;
	            case "hour":
	                ret.setTime(ret.getTime() + units * 3600000);
	                break;
	            case "minute":
	                ret.setTime(ret.getTime() + units * 60000);
	                break;
	            case "second":
	                ret.setTime(ret.getTime() + units * 1000);
	                break;
	            default:
	                ret = undefined;
	                break;
	        }
	        return ret;
	    };
	    /**
	     * Loads a stylesheet into the current page
	     *
	     * @param path The url to the stylesheet
	     * @param avoidCache If true a value will be appended as a query string to avoid browser caching issues
	     */
	    Util.loadStylesheet = function (path, avoidCache) {
	        if (avoidCache) {
	            path += "?" + encodeURIComponent((new Date()).getTime().toString());
	        }
	        var head = document.getElementsByTagName("head");
	        if (head.length > 0) {
	            var e = document.createElement("link");
	            head[0].appendChild(e);
	            e.setAttribute("type", "text/css");
	            e.setAttribute("rel", "stylesheet");
	            e.setAttribute("href", path);
	        }
	    };
	    /**
	     * Combines an arbitrary set of paths ensuring that the slashes are normalized
	     *
	     * @param paths 0 to n path parts to combine
	     */
	    Util.combinePaths = function () {
	        var paths = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            paths[_i - 0] = arguments[_i];
	        }
	        var parts = [];
	        for (var i = 0; i < paths.length; i++) {
	            if (typeof paths[i] !== "undefined" && paths[i] !== null) {
	                parts.push(paths[i].replace(/^[\\|\/]/, "").replace(/[\\|\/]$/, ""));
	            }
	        }
	        return parts.join("/").replace(/\\/, "/");
	    };
	    /**
	     * Gets a random string of chars length
	     *
	     * @param chars The length of the random string to generate
	     */
	    Util.getRandomString = function (chars) {
	        var text = "";
	        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	        for (var i = 0; i < chars; i++) {
	            text += possible.charAt(Math.floor(Math.random() * possible.length));
	        }
	        return text;
	    };
	    /**
	     * Gets a random GUID value
	     *
	     * http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
	     */
	    /* tslint:disable no-bitwise */
	    Util.getGUID = function () {
	        var d = new Date().getTime();
	        var guid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
	            var r = (d + Math.random() * 16) % 16 | 0;
	            d = Math.floor(d / 16);
	            return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
	        });
	        return guid;
	    };
	    /* tslint:enable */
	    /**
	     * Determines if a given value is a function
	     *
	     * @param candidateFunction The thing to test for being a function
	     */
	    Util.isFunction = function (candidateFunction) {
	        return typeof candidateFunction === "function";
	    };
	    /**
	     * @returns whether the provided parameter is a JavaScript Array or not.
	    */
	    Util.isArray = function (array) {
	        if (Array.isArray) {
	            return Array.isArray(array);
	        }
	        return array && typeof array.length === "number" && array.constructor === Array;
	    };
	    /**
	     * Determines if a string is null or empty or undefined
	     *
	     * @param s The string to test
	     */
	    Util.stringIsNullOrEmpty = function (s) {
	        return typeof s === "undefined" || s === null || s === "";
	    };
	    /**
	     * Provides functionality to extend the given object by doing a shallow copy
	     *
	     * @param target The object to which properties will be copied
	     * @param source The source object from which properties will be copied
	     * @param noOverwrite If true existing properties on the target are not overwritten from the source
	     *
	     */
	    /* tslint:disable:forin */
	    Util.extend = function (target, source, noOverwrite) {
	        if (noOverwrite === void 0) { noOverwrite = false; }
	        var result = {};
	        for (var id in target) {
	            result[id] = target[id];
	        }
	        // ensure we don't overwrite things we don't want overwritten
	        var check = noOverwrite ? function (o, i) { return !o.hasOwnProperty(i); } : function (o, i) { return true; };
	        for (var id in source) {
	            if (check(result, id)) {
	                result[id] = source[id];
	            }
	        }
	        return result;
	    };
	    /* tslint:enable */
	    /**
	     * Applies one or more mixins to the supplied target
	     *
	     * @param derivedCtor The classto which we will apply the mixins
	     * @param baseCtors One or more mixin classes to apply
	     */
	    Util.applyMixins = function (derivedCtor) {
	        var baseCtors = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            baseCtors[_i - 1] = arguments[_i];
	        }
	        baseCtors.forEach(function (baseCtor) {
	            Object.getOwnPropertyNames(baseCtor.prototype).forEach(function (name) {
	                derivedCtor.prototype[name] = baseCtor.prototype[name];
	            });
	        });
	    };
	    /**
	     * Determines if a given url is absolute
	     *
	     * @param url The url to check to see if it is absolute
	     */
	    Util.isUrlAbsolute = function (url) {
	        return /^https?:\/\/|^\/\//i.test(url);
	    };
	    /**
	     * Attempts to make the supplied relative url absolute based on the _spPageContextInfo object, if available
	     *
	     * @param url The relative url to make absolute
	     */
	    Util.makeUrlAbsolute = function (url) {
	        if (Util.isUrlAbsolute(url)) {
	            return url;
	        }
	        if (typeof global._spPageContextInfo !== "undefined") {
	            if (global._spPageContextInfo.hasOwnProperty("webAbsoluteUrl")) {
	                return Util.combinePaths(global._spPageContextInfo.webAbsoluteUrl, url);
	            }
	            else if (global._spPageContextInfo.hasOwnProperty("webServerRelativeUrl")) {
	                return Util.combinePaths(global._spPageContextInfo.webServerRelativeUrl, url);
	            }
	        }
	        else {
	            return url;
	        }
	    };
	    return Util;
	}());
	exports.Util = Util;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var util_1 = __webpack_require__(5);
	/**
	 * A wrapper class to provide a consistent interface to browser based storage
	 *
	 */
	var PnPClientStorageWrapper = (function () {
	    /**
	     * Creates a new instance of the PnPClientStorageWrapper class
	     *
	     * @constructor
	     */
	    function PnPClientStorageWrapper(store, defaultTimeoutMinutes) {
	        this.store = store;
	        this.defaultTimeoutMinutes = defaultTimeoutMinutes;
	        this.defaultTimeoutMinutes = (defaultTimeoutMinutes === void 0) ? 5 : defaultTimeoutMinutes;
	        this.enabled = this.test();
	    }
	    /**
	     * Get a value from storage, or null if that value does not exist
	     *
	     * @param key The key whose value we want to retrieve
	     */
	    PnPClientStorageWrapper.prototype.get = function (key) {
	        if (!this.enabled) {
	            return null;
	        }
	        var o = this.store.getItem(key);
	        if (o == null) {
	            return null;
	        }
	        var persistable = JSON.parse(o);
	        if (new Date(persistable.expiration) <= new Date()) {
	            this.delete(key);
	            return null;
	        }
	        else {
	            return persistable.value;
	        }
	    };
	    /**
	     * Adds a value to the underlying storage
	     *
	     * @param key The key to use when storing the provided value
	     * @param o The value to store
	     * @param expire Optional, if provided the expiration of the item, otherwise the default is used
	     */
	    PnPClientStorageWrapper.prototype.put = function (key, o, expire) {
	        if (this.enabled) {
	            this.store.setItem(key, this.createPersistable(o, expire));
	        }
	    };
	    /**
	     * Deletes a value from the underlying storage
	     *
	     * @param key The key of the pair we want to remove from storage
	     */
	    PnPClientStorageWrapper.prototype.delete = function (key) {
	        if (this.enabled) {
	            this.store.removeItem(key);
	        }
	    };
	    /**
	     * Gets an item from the underlying storage, or adds it if it does not exist using the supplied getter function
	     *
	     * @param key The key to use when storing the provided value
	     * @param getter A function which will upon execution provide the desired value
	     * @param expire Optional, if provided the expiration of the item, otherwise the default is used
	     */
	    PnPClientStorageWrapper.prototype.getOrPut = function (key, getter, expire) {
	        var _this = this;
	        if (!this.enabled) {
	            return getter();
	        }
	        if (!util_1.Util.isFunction(getter)) {
	            throw "Function expected for parameter 'getter'.";
	        }
	        return new Promise(function (resolve, reject) {
	            var o = _this.get(key);
	            if (o == null) {
	                getter().then(function (d) {
	                    _this.put(key, d, expire);
	                    resolve(d);
	                });
	            }
	            else {
	                resolve(o);
	            }
	        });
	    };
	    /**
	     * Used to determine if the wrapped storage is available currently
	     */
	    PnPClientStorageWrapper.prototype.test = function () {
	        var str = "test";
	        try {
	            this.store.setItem(str, str);
	            this.store.removeItem(str);
	            return true;
	        }
	        catch (e) {
	            return false;
	        }
	    };
	    /**
	     * Creates the persistable to store
	     */
	    PnPClientStorageWrapper.prototype.createPersistable = function (o, expire) {
	        if (typeof expire === "undefined") {
	            expire = util_1.Util.dateAdd(new Date(), "minute", this.defaultTimeoutMinutes);
	        }
	        return JSON.stringify({ expiration: expire, value: o });
	    };
	    return PnPClientStorageWrapper;
	}());
	exports.PnPClientStorageWrapper = PnPClientStorageWrapper;
	/**
	 * A class that will establish wrappers for both local and session storage
	 */
	var PnPClientStorage = (function () {
	    /**
	     * Creates a new instance of the PnPClientStorage class
	     *
	     * @constructor
	     */
	    function PnPClientStorage() {
	        this.local = typeof localStorage !== "undefined" ? new PnPClientStorageWrapper(localStorage) : null;
	        this.session = typeof sessionStorage !== "undefined" ? new PnPClientStorageWrapper(sessionStorage) : null;
	    }
	    return PnPClientStorage;
	}());
	exports.PnPClientStorage = PnPClientStorage;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Collections = __webpack_require__(8);
	var providers = __webpack_require__(9);
	/**
	 * Class used to manage the current application settings
	 *
	 */
	var Settings = (function () {
	    /**
	     * Creates a new instance of the settings class
	     *
	     * @constructor
	     */
	    function Settings() {
	        /**
	         * Set of pre-defined providers which are available from this library
	         */
	        this.Providers = providers;
	        this._settings = new Collections.Dictionary();
	    }
	    /**
	     * Adds a new single setting, or overwrites a previous setting with the same key
	     *
	     * @param {string} key The key used to store this setting
	     * @param {string} value The setting value to store
	     */
	    Settings.prototype.add = function (key, value) {
	        this._settings.add(key, value);
	    };
	    /**
	     * Adds a JSON value to the collection as a string, you must use getJSON to rehydrate the object when read
	     *
	     * @param {string} key The key used to store this setting
	     * @param {any} value The setting value to store
	     */
	    Settings.prototype.addJSON = function (key, value) {
	        this._settings.add(key, JSON.stringify(value));
	    };
	    /**
	     * Applies the supplied hash to the setting collection overwriting any existing value, or created new values
	     *
	     * @param {Collections.TypedHash<any>} hash The set of values to add
	     */
	    Settings.prototype.apply = function (hash) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            try {
	                _this._settings.merge(hash);
	                resolve();
	            }
	            catch (e) {
	                reject(e);
	            }
	        });
	    };
	    /**
	     * Loads configuration settings into the collection from the supplied provider and returns a Promise
	     *
	     * @param {IConfigurationProvider} provider The provider from which we will load the settings
	     */
	    Settings.prototype.load = function (provider) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            provider.getConfiguration().then(function (value) {
	                _this._settings.merge(value);
	                resolve();
	            }).catch(function (reason) {
	                reject(reason);
	            });
	        });
	    };
	    /**
	     * Gets a value from the configuration
	     *
	     * @param {string} key The key whose value we want to return. Returns null if the key does not exist
	     * @return {string} string value from the configuration
	     */
	    Settings.prototype.get = function (key) {
	        return this._settings.get(key);
	    };
	    /**
	     * Gets a JSON value, rehydrating the stored string to the original object
	     *
	     * @param {string} key The key whose value we want to return. Returns null if the key does not exist
	     * @return {any} object from the configuration
	     */
	    Settings.prototype.getJSON = function (key) {
	        var o = this.get(key);
	        if (typeof o === "undefined" || o === null) {
	            return o;
	        }
	        return JSON.parse(o);
	    };
	    return Settings;
	}());
	exports.Settings = Settings;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var util_1 = __webpack_require__(5);
	/**
	 * Generic dictionary
	 */
	var Dictionary = (function () {
	    /**
	     * Creates a new instance of the Dictionary<T> class
	     *
	     * @constructor
	     */
	    function Dictionary() {
	        this.keys = [];
	        this.values = [];
	    }
	    /**
	     * Gets a value from the collection using the specified key
	     *
	     * @param key The key whose value we want to return, returns null if the key does not exist
	     */
	    Dictionary.prototype.get = function (key) {
	        var index = this.keys.indexOf(key);
	        if (index < 0) {
	            return null;
	        }
	        return this.values[index];
	    };
	    /**
	     * Adds the supplied key and value to the dictionary
	     *
	     * @param key The key to add
	     * @param o The value to add
	     */
	    Dictionary.prototype.add = function (key, o) {
	        var index = this.keys.indexOf(key);
	        if (index > -1) {
	            this.values[index] = o;
	        }
	        else {
	            this.keys.push(key);
	            this.values.push(o);
	        }
	    };
	    /**
	     * Merges the supplied typed hash into this dictionary instance. Existing values are updated and new ones are created as appropriate.
	     */
	    /* tslint:disable no-string-literal */
	    Dictionary.prototype.merge = function (source) {
	        if (util_1.Util.isFunction(source["getKeys"])) {
	            var sourceAsDictionary = source;
	            var keys = sourceAsDictionary.getKeys();
	            var l = keys.length;
	            for (var i = 0; i < l; i++) {
	                this.add(keys[i], sourceAsDictionary.get(keys[i]));
	            }
	        }
	        else {
	            var sourceAsHash = source;
	            for (var key in sourceAsHash) {
	                if (sourceAsHash.hasOwnProperty(key)) {
	                    this.add(key, source[key]);
	                }
	            }
	        }
	    };
	    /* tslint:enable */
	    /**
	     * Removes a value from the dictionary
	     *
	     * @param key The key of the key/value pair to remove. Returns null if the key was not found.
	     */
	    Dictionary.prototype.remove = function (key) {
	        var index = this.keys.indexOf(key);
	        if (index < 0) {
	            // could throw an exception here
	            return null;
	        }
	        var val = this.values[index];
	        this.keys.splice(index, 1);
	        this.values.splice(index, 1);
	        return val;
	    };
	    /**
	     * Returns all the keys currently in the dictionary as an array
	     */
	    Dictionary.prototype.getKeys = function () {
	        return this.keys;
	    };
	    /**
	     * Returns all the values currently in the dictionary as an array
	     */
	    Dictionary.prototype.getValues = function () {
	        return this.values;
	    };
	    /**
	     * Clears the current dictionary
	     */
	    Dictionary.prototype.clear = function () {
	        this.keys = [];
	        this.values = [];
	    };
	    /**
	     * Gets a count of the items currently in the dictionary
	     */
	    Dictionary.prototype.count = function () {
	        return this.keys.length;
	    };
	    return Dictionary;
	}());
	exports.Dictionary = Dictionary;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var cachingConfigurationProvider_1 = __webpack_require__(10);
	var spListConfigurationProvider_1 = __webpack_require__(11);
	exports.CachingConfigurationProvider = cachingConfigurationProvider_1.default;
	exports.SPListConfigurationProvider = spListConfigurationProvider_1.default;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var storage = __webpack_require__(6);
	/**
	 * A caching provider which can wrap other non-caching providers
	 *
	 */
	var CachingConfigurationProvider = (function () {
	    /**
	     * Creates a new caching configuration provider
	     * @constructor
	     * @param {IConfigurationProvider} wrappedProvider Provider which will be used to fetch the configuration
	     * @param {string} cacheKey Key that will be used to store cached items to the cache
	     * @param {IPnPClientStore} cacheStore OPTIONAL storage, which will be used to store cached settings.
	     */
	    function CachingConfigurationProvider(wrappedProvider, cacheKey, cacheStore) {
	        this.wrappedProvider = wrappedProvider;
	        this.store = (cacheStore) ? cacheStore : this.selectPnPCache();
	        this.cacheKey = "_configcache_" + cacheKey;
	    }
	    /**
	     * Gets the wrapped configuration providers
	     *
	     * @return {IConfigurationProvider} Wrapped configuration provider
	     */
	    CachingConfigurationProvider.prototype.getWrappedProvider = function () {
	        return this.wrappedProvider;
	    };
	    /**
	     * Loads the configuration values either from the cache or from the wrapped provider
	     *
	     * @return {Promise<TypedHash<string>>} Promise of loaded configuration values
	     */
	    CachingConfigurationProvider.prototype.getConfiguration = function () {
	        var _this = this;
	        // Cache not available, pass control to  the wrapped provider
	        if ((!this.store) || (!this.store.enabled)) {
	            return this.wrappedProvider.getConfiguration();
	        }
	        // Value is found in cache, return it directly
	        var cachedConfig = this.store.get(this.cacheKey);
	        if (cachedConfig) {
	            return new Promise(function (resolve, reject) {
	                resolve(cachedConfig);
	            });
	        }
	        // Get and cache value from the wrapped provider
	        var providerPromise = this.wrappedProvider.getConfiguration();
	        providerPromise.then(function (providedConfig) {
	            _this.store.put(_this.cacheKey, providedConfig);
	        });
	        return providerPromise;
	    };
	    CachingConfigurationProvider.prototype.selectPnPCache = function () {
	        var pnpCache = new storage.PnPClientStorage();
	        if ((pnpCache.local) && (pnpCache.local.enabled)) {
	            return pnpCache.local;
	        }
	        if ((pnpCache.session) && (pnpCache.session.enabled)) {
	            return pnpCache.session;
	        }
	        throw new Error("Cannot create a caching configuration provider since cache is not available.");
	    };
	    return CachingConfigurationProvider;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = CachingConfigurationProvider;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var cachingConfigurationProvider_1 = __webpack_require__(10);
	/**
	 * A configuration provider which loads configuration values from a SharePoint list
	 *
	 */
	var SPListConfigurationProvider = (function () {
	    /**
	     * Creates a new SharePoint list based configuration provider
	     * @constructor
	     * @param {string} webUrl Url of the SharePoint site, where the configuration list is located
	     * @param {string} listTitle Title of the SharePoint list, which contains the configuration settings (optional, default = "config")
	     */
	    function SPListConfigurationProvider(sourceWeb, sourceListTitle) {
	        if (sourceListTitle === void 0) { sourceListTitle = "config"; }
	        this.sourceWeb = sourceWeb;
	        this.sourceListTitle = sourceListTitle;
	    }
	    Object.defineProperty(SPListConfigurationProvider.prototype, "web", {
	        /**
	         * Gets the url of the SharePoint site, where the configuration list is located
	         *
	         * @return {string} Url address of the site
	         */
	        get: function () {
	            return this.sourceWeb;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SPListConfigurationProvider.prototype, "listTitle", {
	        /**
	         * Gets the title of the SharePoint list, which contains the configuration settings
	         *
	         * @return {string} List title
	         */
	        get: function () {
	            return this.sourceListTitle;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Loads the configuration values from the SharePoint list
	     *
	     * @return {Promise<TypedHash<string>>} Promise of loaded configuration values
	     */
	    SPListConfigurationProvider.prototype.getConfiguration = function () {
	        return this.web.lists.getByTitle(this.listTitle).items.select("Title", "Value")
	            .getAs().then(function (data) {
	            var configuration = {};
	            data.forEach(function (i) {
	                configuration[i.Title] = i.Value;
	            });
	            return configuration;
	        });
	    };
	    /**
	     * Wraps the current provider in a cache enabled provider
	     *
	     * @return {CachingConfigurationProvider} Caching providers which wraps the current provider
	     */
	    SPListConfigurationProvider.prototype.asCaching = function () {
	        var cacheKey = "splist_" + this.web.toUrl() + "+" + this.listTitle;
	        return new cachingConfigurationProvider_1.default(this, cacheKey);
	    };
	    return SPListConfigurationProvider;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = SPListConfigurationProvider;


/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * A set of logging levels
	 *
	 */
	(function (LogLevel) {
	    LogLevel[LogLevel["Verbose"] = 0] = "Verbose";
	    LogLevel[LogLevel["Info"] = 1] = "Info";
	    LogLevel[LogLevel["Warning"] = 2] = "Warning";
	    LogLevel[LogLevel["Error"] = 3] = "Error";
	    LogLevel[LogLevel["Off"] = 99] = "Off";
	})(exports.LogLevel || (exports.LogLevel = {}));
	var LogLevel = exports.LogLevel;
	/**
	 * Class used to subscribe ILogListener and log messages throughout an application
	 *
	 */
	var Logger = (function () {
	    function Logger() {
	    }
	    Object.defineProperty(Logger, "activeLogLevel", {
	        get: function () {
	            return Logger.instance.activeLogLevel;
	        },
	        set: function (value) {
	            Logger.instance.activeLogLevel = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Logger, "instance", {
	        get: function () {
	            if (typeof Logger._instance === "undefined" || Logger._instance === null) {
	                Logger._instance = new LoggerImpl();
	            }
	            return Logger._instance;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Adds an ILogListener instance to the set of subscribed listeners
	     *
	     * @param listeners One or more listeners to subscribe to this log
	     */
	    Logger.subscribe = function () {
	        var listeners = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            listeners[_i - 0] = arguments[_i];
	        }
	        for (var i = 0; i < listeners.length; i++) {
	            Logger.instance.subscribe(listeners[i]);
	        }
	    };
	    /**
	     * Clears the subscribers collection, returning the collection before modifiction
	     */
	    Logger.clearSubscribers = function () {
	        return Logger.instance.clearSubscribers();
	    };
	    Object.defineProperty(Logger, "count", {
	        /**
	         * Gets the current subscriber count
	         */
	        get: function () {
	            return Logger.instance.count;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Writes the supplied string to the subscribed listeners
	     *
	     * @param message The message to write
	     * @param level [Optional] if supplied will be used as the level of the entry (Default: LogLevel.Verbose)
	     */
	    Logger.write = function (message, level) {
	        if (level === void 0) { level = LogLevel.Verbose; }
	        Logger.instance.log({ level: level, message: message });
	    };
	    /**
	     * Logs the supplied entry to the subscribed listeners
	     *
	     * @param entry The message to log
	     */
	    Logger.log = function (entry) {
	        Logger.instance.log(entry);
	    };
	    /**
	     * Logs performance tracking data for the the execution duration of the supplied function using console.profile
	     *
	     * @param name The name of this profile boundary
	     * @param f The function to execute and track within this performance boundary
	     */
	    Logger.measure = function (name, f) {
	        return Logger.instance.measure(name, f);
	    };
	    return Logger;
	}());
	exports.Logger = Logger;
	var LoggerImpl = (function () {
	    function LoggerImpl(activeLogLevel, subscribers) {
	        if (activeLogLevel === void 0) { activeLogLevel = LogLevel.Warning; }
	        if (subscribers === void 0) { subscribers = []; }
	        this.activeLogLevel = activeLogLevel;
	        this.subscribers = subscribers;
	    }
	    LoggerImpl.prototype.subscribe = function (listener) {
	        this.subscribers.push(listener);
	    };
	    LoggerImpl.prototype.clearSubscribers = function () {
	        var s = this.subscribers.slice(0);
	        this.subscribers.length = 0;
	        return s;
	    };
	    Object.defineProperty(LoggerImpl.prototype, "count", {
	        get: function () {
	            return this.subscribers.length;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    LoggerImpl.prototype.write = function (message, level) {
	        if (level === void 0) { level = LogLevel.Verbose; }
	        this.log({ level: level, message: message });
	    };
	    LoggerImpl.prototype.log = function (entry) {
	        if (typeof entry === "undefined" || entry.level < this.activeLogLevel) {
	            return;
	        }
	        for (var i = 0; i < this.subscribers.length; i++) {
	            this.subscribers[i].log(entry);
	        }
	    };
	    LoggerImpl.prototype.measure = function (name, f) {
	        console.profile(name);
	        try {
	            return f();
	        }
	        finally {
	            console.profileEnd();
	        }
	    };
	    return LoggerImpl;
	}());
	/**
	 * Implementation of ILogListener which logs to the browser console
	 *
	 */
	var ConsoleListener = (function () {
	    function ConsoleListener() {
	    }
	    /**
	     * Any associated data that a given logging listener may choose to log or ignore
	     *
	     * @param entry The information to be logged
	     */
	    ConsoleListener.prototype.log = function (entry) {
	        var msg = this.format(entry);
	        switch (entry.level) {
	            case LogLevel.Verbose:
	            case LogLevel.Info:
	                console.log(msg);
	                break;
	            case LogLevel.Warning:
	                console.warn(msg);
	                break;
	            case LogLevel.Error:
	                console.error(msg);
	                break;
	        }
	    };
	    /**
	     * Formats the message
	     *
	     * @param entry The information to format into a string
	     */
	    ConsoleListener.prototype.format = function (entry) {
	        return "Message: " + entry.message + ". Data: " + JSON.stringify(entry.data);
	    };
	    return ConsoleListener;
	}());
	exports.ConsoleListener = ConsoleListener;
	/* tslint:disable */
	/**
	 * Implementation of ILogListener which logs to Azure Insights
	 *
	 */
	var AzureInsightsListener = (function () {
	    /**
	     * Creats a new instance of the AzureInsightsListener class
	     *
	     * @constructor
	     * @param azureInsightsInstrumentationKey The instrumentation key created when the Azure Insights instance was created
	     */
	    function AzureInsightsListener(azureInsightsInstrumentationKey) {
	        this.azureInsightsInstrumentationKey = azureInsightsInstrumentationKey;
	        var appInsights = window["appInsights"] || function (config) {
	            function r(config) {
	                t[config] = function () {
	                    var i = arguments;
	                    t.queue.push(function () { t[config].apply(t, i); });
	                };
	            }
	            var t = { config: config }, u = document, e = window, o = "script", s = u.createElement(o), i, f;
	            for (s.src = config.url || "//az416426.vo.msecnd.net/scripts/a/ai.0.js", u.getElementsByTagName(o)[0].parentNode.appendChild(s), t.cookie = u.cookie, t.queue = [], i = ["Event", "Exception", "Metric", "PageView", "Trace"]; i.length;) {
	                r("track" + i.pop());
	            }
	            return r("setAuthenticatedUserContext"), r("clearAuthenticatedUserContext"), config.disableExceptionTracking || (i = "onerror", r("_" + i), f = e[i], e[i] = function (config, r, u, e, o) {
	                var s = f && f(config, r, u, e, o);
	                return s !== !0 && t["_" + i](config, r, u, e, o), s;
	            }), t;
	        }({
	            instrumentationKey: this.azureInsightsInstrumentationKey
	        });
	        window["appInsights"] = appInsights;
	    }
	    /**
	     * Any associated data that a given logging listener may choose to log or ignore
	     *
	     * @param entry The information to be logged
	     */
	    AzureInsightsListener.prototype.log = function (entry) {
	        var ai = window["appInsights"];
	        var msg = this.format(entry);
	        if (entry.level === LogLevel.Error) {
	            ai.trackException(msg);
	        }
	        else {
	            ai.trackEvent(msg);
	        }
	    };
	    /**
	     * Formats the message
	     *
	     * @param entry The information to format into a string
	     */
	    AzureInsightsListener.prototype.format = function (entry) {
	        return "Message: " + entry.message + ". Data: " + JSON.stringify(entry.data);
	    };
	    return AzureInsightsListener;
	}());
	exports.AzureInsightsListener = AzureInsightsListener;
	/* tslint:enable */
	/**
	 * Implementation of ILogListener which logs to the supplied function
	 *
	 */
	var FunctionListener = (function () {
	    /**
	     * Creates a new instance of the FunctionListener class
	     *
	     * @constructor
	     * @param  method The method to which any logging data will be passed
	     */
	    function FunctionListener(method) {
	        this.method = method;
	    }
	    /**
	     * Any associated data that a given logging listener may choose to log or ignore
	     *
	     * @param entry The information to be logged
	     */
	    FunctionListener.prototype.log = function (entry) {
	        this.method(entry);
	    };
	    return FunctionListener;
	}());
	exports.FunctionListener = FunctionListener;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var search_1 = __webpack_require__(14);
	var searchsuggest_1 = __webpack_require__(24);
	var site_1 = __webpack_require__(25);
	var webs_1 = __webpack_require__(26);
	var util_1 = __webpack_require__(5);
	var userprofiles_1 = __webpack_require__(45);
	/**
	 * Root of the SharePoint REST module
	 */
	var Rest = (function () {
	    function Rest() {
	    }
	    /**
	     * Executes a search against this web context
	     *
	     * @param query The SearchQuery definition
	     */
	    Rest.prototype.searchSuggest = function (query) {
	        var finalQuery;
	        if (typeof query === "string") {
	            finalQuery = { querytext: query };
	        }
	        else {
	            finalQuery = query;
	        }
	        return new searchsuggest_1.SearchSuggest("").execute(finalQuery);
	    };
	    /**
	     * Executes a search against this web context
	     *
	     * @param query The SearchQuery definition
	     */
	    Rest.prototype.search = function (query) {
	        var finalQuery;
	        if (typeof query === "string") {
	            finalQuery = { Querytext: query };
	        }
	        else {
	            finalQuery = query;
	        }
	        return new search_1.Search("").execute(finalQuery);
	    };
	    Object.defineProperty(Rest.prototype, "site", {
	        /**
	         * Begins a site collection scoped REST request
	         *
	         */
	        get: function () {
	            return new site_1.Site("");
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Rest.prototype, "web", {
	        /**
	         * Begins a web scoped REST request
	         *
	         */
	        get: function () {
	            return new webs_1.Web("");
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Rest.prototype, "profiles", {
	        /**
	         * Access to user profile methods
	         *
	         */
	        get: function () {
	            return new userprofiles_1.UserProfileQuery("");
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Creates a new batch object for use with the Queryable.addToBatch method
	     *
	     */
	    Rest.prototype.createBatch = function () {
	        return this.web.createBatch();
	    };
	    /**
	     * Begins a cross-domain, host site scoped REST request, for use in add-in webs
	     *
	     * @param addInWebUrl The absolute url of the add-in web
	     * @param hostWebUrl The absolute url of the host web
	     */
	    Rest.prototype.crossDomainSite = function (addInWebUrl, hostWebUrl) {
	        return this._cdImpl(site_1.Site, addInWebUrl, hostWebUrl, "site");
	    };
	    /**
	     * Begins a cross-domain, host web scoped REST request, for use in add-in webs
	     *
	     * @param addInWebUrl The absolute url of the add-in web
	     * @param hostWebUrl The absolute url of the host web
	     */
	    Rest.prototype.crossDomainWeb = function (addInWebUrl, hostWebUrl) {
	        return this._cdImpl(webs_1.Web, addInWebUrl, hostWebUrl, "web");
	    };
	    /**
	     * Implements the creation of cross domain REST urls
	     *
	     * @param factory The constructor of the object to create Site | Web
	     * @param addInWebUrl The absolute url of the add-in web
	     * @param hostWebUrl The absolute url of the host web
	     * @param urlPart String part to append to the url "site" | "web"
	     */
	    Rest.prototype._cdImpl = function (factory, addInWebUrl, hostWebUrl, urlPart) {
	        if (!util_1.Util.isUrlAbsolute(addInWebUrl)) {
	            throw "The addInWebUrl parameter must be an absolute url.";
	        }
	        if (!util_1.Util.isUrlAbsolute(hostWebUrl)) {
	            throw "The hostWebUrl parameter must be an absolute url.";
	        }
	        var url = util_1.Util.combinePaths(addInWebUrl, "_api/SP.AppContextSite(@target)");
	        var instance = new factory(url, urlPart);
	        instance.query.add("@target", "'" + encodeURIComponent(hostWebUrl) + "'");
	        return instance;
	    };
	    return Rest;
	}());
	exports.Rest = Rest;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var queryable_1 = __webpack_require__(15);
	var util_1 = __webpack_require__(5);
	/**
	 * Describes the search API
	 *
	 */
	var Search = (function (_super) {
	    __extends(Search, _super);
	    /**
	     * Creates a new instance of the Search class
	     *
	     * @param baseUrl The url for the search context
	     * @param query The SearchQuery object to execute
	     */
	    function Search(baseUrl, path) {
	        if (path === void 0) { path = "_api/search/postquery"; }
	        _super.call(this, baseUrl, path);
	    }
	    /**
	     * .......
	     * @returns Promise
	     */
	    Search.prototype.execute = function (query) {
	        var formattedBody;
	        formattedBody = query;
	        if (formattedBody.SelectProperties) {
	            formattedBody.SelectProperties = { results: query.SelectProperties };
	        }
	        if (formattedBody.RefinementFilters) {
	            formattedBody.RefinementFilters = { results: query.RefinementFilters };
	        }
	        if (formattedBody.SortList) {
	            formattedBody.SortList = { results: query.SortList };
	        }
	        if (formattedBody.HithighlightedProperties) {
	            formattedBody.HithighlightedProperties = { results: query.HithighlightedProperties };
	        }
	        if (formattedBody.ReorderingRules) {
	            formattedBody.ReorderingRules = { results: query.ReorderingRules };
	        }
	        if (formattedBody.Properties) {
	            formattedBody.Properties = { results: query.Properties };
	        }
	        var postBody = JSON.stringify({
	            request: util_1.Util.extend({
	                "__metadata": { "type": "Microsoft.Office.Server.Search.REST.SearchRequest" },
	            }, formattedBody),
	        });
	        return this.post({ body: postBody }).then(function (data) { return new SearchResults(data); });
	    };
	    return Search;
	}(queryable_1.QueryableInstance));
	exports.Search = Search;
	/**
	 * Describes the SearchResults class, which returns the formatted and raw version of the query response
	 */
	var SearchResults = (function () {
	    /**
	     * Creates a new instance of the SearchResult class
	     *
	     */
	    function SearchResults(rawResponse) {
	        var response = rawResponse.postquery ? rawResponse.postquery : rawResponse;
	        this.PrimarySearchResults = this.formatSearchResults(response.PrimaryQueryResult.RelevantResults.Table.Rows);
	        this.RawSearchResults = response;
	        this.ElapsedTime = response.ElapsedTime;
	        this.RowCount = response.PrimaryQueryResult.RelevantResults.RowCount;
	        this.TotalRows = response.PrimaryQueryResult.RelevantResults.TotalRows;
	        this.TotalRowsIncludingDuplicates = response.PrimaryQueryResult.RelevantResults.TotalRowsIncludingDuplicates;
	    }
	    /**
	     * Formats a search results array
	     *
	     * @param rawResults The array to process
	     */
	    SearchResults.prototype.formatSearchResults = function (rawResults) {
	        var results = new Array(), tempResults = rawResults.results ? rawResults.results : rawResults;
	        for (var _i = 0, tempResults_1 = tempResults; _i < tempResults_1.length; _i++) {
	            var i = tempResults_1[_i];
	            results.push(new SearchResult(i.Cells));
	        }
	        return results;
	    };
	    return SearchResults;
	}());
	exports.SearchResults = SearchResults;
	/**
	 * Describes the SearchResult class
	 */
	var SearchResult = (function () {
	    /**
	     * Creates a new instance of the SearchResult class
	     *
	     */
	    function SearchResult(rawItem) {
	        var item = rawItem.results ? rawItem.results : rawItem;
	        for (var _i = 0, item_1 = item; _i < item_1.length; _i++) {
	            var i = item_1[_i];
	            this[i.Key] = i.Value;
	        }
	    }
	    return SearchResult;
	}());
	exports.SearchResult = SearchResult;
	/**
	 * defines the SortDirection enum
	 */
	(function (SortDirection) {
	    SortDirection[SortDirection["Ascending"] = 0] = "Ascending";
	    SortDirection[SortDirection["Descending"] = 1] = "Descending";
	    SortDirection[SortDirection["FQLFormula"] = 2] = "FQLFormula";
	})(exports.SortDirection || (exports.SortDirection = {}));
	var SortDirection = exports.SortDirection;
	/**
	 * defines the ReorderingRuleMatchType  enum
	 */
	(function (ReorderingRuleMatchType) {
	    ReorderingRuleMatchType[ReorderingRuleMatchType["ResultContainsKeyword"] = 0] = "ResultContainsKeyword";
	    ReorderingRuleMatchType[ReorderingRuleMatchType["TitleContainsKeyword"] = 1] = "TitleContainsKeyword";
	    ReorderingRuleMatchType[ReorderingRuleMatchType["TitleMatchesKeyword"] = 2] = "TitleMatchesKeyword";
	    ReorderingRuleMatchType[ReorderingRuleMatchType["UrlStartsWith"] = 3] = "UrlStartsWith";
	    ReorderingRuleMatchType[ReorderingRuleMatchType["UrlExactlyMatches"] = 4] = "UrlExactlyMatches";
	    ReorderingRuleMatchType[ReorderingRuleMatchType["ContentTypeIs"] = 5] = "ContentTypeIs";
	    ReorderingRuleMatchType[ReorderingRuleMatchType["FileExtensionMatches"] = 6] = "FileExtensionMatches";
	    ReorderingRuleMatchType[ReorderingRuleMatchType["ResultHasTag"] = 7] = "ResultHasTag";
	    ReorderingRuleMatchType[ReorderingRuleMatchType["ManualCondition"] = 8] = "ManualCondition";
	})(exports.ReorderingRuleMatchType || (exports.ReorderingRuleMatchType = {}));
	var ReorderingRuleMatchType = exports.ReorderingRuleMatchType;
	/**
	 * Specifies the type value for the property
	 */
	(function (QueryPropertyValueType) {
	    QueryPropertyValueType[QueryPropertyValueType["None"] = 0] = "None";
	    QueryPropertyValueType[QueryPropertyValueType["StringType"] = 1] = "StringType";
	    QueryPropertyValueType[QueryPropertyValueType["Int32TYpe"] = 2] = "Int32TYpe";
	    QueryPropertyValueType[QueryPropertyValueType["BooleanType"] = 3] = "BooleanType";
	    QueryPropertyValueType[QueryPropertyValueType["StringArrayType"] = 4] = "StringArrayType";
	    QueryPropertyValueType[QueryPropertyValueType["UnSupportedType"] = 5] = "UnSupportedType";
	})(exports.QueryPropertyValueType || (exports.QueryPropertyValueType = {}));
	var QueryPropertyValueType = exports.QueryPropertyValueType;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var util_1 = __webpack_require__(5);
	var logging_1 = __webpack_require__(12);
	var collections_1 = __webpack_require__(8);
	var httpclient_1 = __webpack_require__(16);
	var odata_1 = __webpack_require__(19);
	var caching_1 = __webpack_require__(23);
	var pnplibconfig_1 = __webpack_require__(20);
	/**
	 * Queryable Base Class
	 *
	 */
	var Queryable = (function () {
	    /**
	     * Creates a new instance of the Queryable class
	     *
	     * @constructor
	     * @param baseUrl A string or Queryable that should form the base part of the url
	     *
	     */
	    function Queryable(baseUrl, path) {
	        this._query = new collections_1.Dictionary();
	        this._batch = null;
	        if (typeof baseUrl === "string") {
	            // we need to do some extra parsing to get the parent url correct if we are
	            // being created from just a string.
	            var urlStr = baseUrl;
	            if (util_1.Util.isUrlAbsolute(urlStr) || urlStr.lastIndexOf("/") < 0) {
	                this._parentUrl = urlStr;
	                this._url = util_1.Util.combinePaths(urlStr, path);
	            }
	            else if (urlStr.lastIndexOf("/") > urlStr.lastIndexOf("(")) {
	                // .../items(19)/fields
	                var index = urlStr.lastIndexOf("/");
	                this._parentUrl = urlStr.slice(0, index);
	                path = util_1.Util.combinePaths(urlStr.slice(index), path);
	                this._url = util_1.Util.combinePaths(this._parentUrl, path);
	            }
	            else {
	                // .../items(19)
	                var index = urlStr.lastIndexOf("(");
	                this._parentUrl = urlStr.slice(0, index);
	                this._url = util_1.Util.combinePaths(urlStr, path);
	            }
	        }
	        else {
	            var q = baseUrl;
	            this._parentUrl = q._url;
	            var target = q._query.get("@target");
	            if (target !== null) {
	                this._query.add("@target", target);
	            }
	            this._url = util_1.Util.combinePaths(this._parentUrl, path);
	        }
	    }
	    /**
	     * Directly concatonates the supplied string to the current url, not normalizing "/" chars
	     *
	     * @param pathPart The string to concatonate to the url
	     */
	    Queryable.prototype.concat = function (pathPart) {
	        this._url += pathPart;
	    };
	    /**
	     * Appends the given string and normalizes "/" chars
	     *
	     * @param pathPart The string to append
	     */
	    Queryable.prototype.append = function (pathPart) {
	        this._url = util_1.Util.combinePaths(this._url, pathPart);
	    };
	    /**
	     * Blocks a batch call from occuring, MUST be cleared by calling the returned function
	     */
	    Queryable.prototype.addBatchDependency = function () {
	        if (this.hasBatch) {
	            return this._batch.addBatchDependency();
	        }
	        return function () { return null; };
	    };
	    Object.defineProperty(Queryable.prototype, "hasBatch", {
	        /**
	         * Indicates if the current query has a batch associated
	         *
	         */
	        get: function () {
	            return this._batch !== null;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Queryable.prototype, "parentUrl", {
	        /**
	         * Gets the parent url used when creating this instance
	         *
	         */
	        get: function () {
	            return this._parentUrl;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Queryable.prototype, "query", {
	        /**
	         * Provides access to the query builder for this url
	         *
	         */
	        get: function () {
	            return this._query;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Adds this query to the supplied batch
	     *
	     * @example
	     * ```
	     *
	     * let b = pnp.sp.createBatch();
	     * pnp.sp.web.inBatch(b).get().then(...);
	     * b.execute().then(...)
	     * ```
	     */
	    Queryable.prototype.inBatch = function (batch) {
	        if (this._batch !== null) {
	            throw new Error("This query is already part of a batch.");
	        }
	        this._batch = batch;
	        return this;
	    };
	    /**
	     * Enables caching for this request
	     *
	     * @param options Defines the options used when caching this request
	     */
	    Queryable.prototype.usingCaching = function (options) {
	        if (!pnplibconfig_1.RuntimeConfig.globalCacheDisable) {
	            this._useCaching = true;
	            this._cachingOptions = options;
	        }
	        return this;
	    };
	    /**
	     * Gets the currentl url, made absolute based on the availability of the _spPageContextInfo object
	     *
	     */
	    Queryable.prototype.toUrl = function () {
	        return util_1.Util.makeUrlAbsolute(this._url);
	    };
	    /**
	     * Gets the full url with query information
	     *
	     */
	    Queryable.prototype.toUrlAndQuery = function () {
	        var _this = this;
	        var url = this.toUrl();
	        if (this._query.count() > 0) {
	            url += "?";
	            var keys = this._query.getKeys();
	            url += keys.map(function (key, ix, arr) { return (key + "=" + _this._query.get(key)); }).join("&");
	        }
	        return url;
	    };
	    /**
	     * Executes the currently built request
	     *
	     */
	    Queryable.prototype.get = function (parser, getOptions) {
	        if (parser === void 0) { parser = new odata_1.ODataDefaultParser(); }
	        if (getOptions === void 0) { getOptions = {}; }
	        return this.getImpl(getOptions, parser);
	    };
	    Queryable.prototype.getAs = function (parser, getOptions) {
	        if (parser === void 0) { parser = new odata_1.ODataDefaultParser(); }
	        if (getOptions === void 0) { getOptions = {}; }
	        return this.getImpl(getOptions, parser);
	    };
	    Queryable.prototype.post = function (postOptions, parser) {
	        if (postOptions === void 0) { postOptions = {}; }
	        if (parser === void 0) { parser = new odata_1.ODataDefaultParser(); }
	        return this.postImpl(postOptions, parser);
	    };
	    Queryable.prototype.postAs = function (postOptions, parser) {
	        if (postOptions === void 0) { postOptions = {}; }
	        if (parser === void 0) { parser = new odata_1.ODataDefaultParser(); }
	        return this.postImpl(postOptions, parser);
	    };
	    Queryable.prototype.patch = function (patchOptions, parser) {
	        if (patchOptions === void 0) { patchOptions = {}; }
	        if (parser === void 0) { parser = new odata_1.ODataDefaultParser(); }
	        return this.patchImpl(patchOptions, parser);
	    };
	    Queryable.prototype.delete = function (deleteOptions, parser) {
	        if (deleteOptions === void 0) { deleteOptions = {}; }
	        if (parser === void 0) { parser = new odata_1.ODataDefaultParser(); }
	        return this.deleteImpl(deleteOptions, parser);
	    };
	    /**
	     * Gets a parent for this instance as specified
	     *
	     * @param factory The contructor for the class to create
	     */
	    Queryable.prototype.getParent = function (factory, baseUrl, path) {
	        if (baseUrl === void 0) { baseUrl = this.parentUrl; }
	        var parent = new factory(baseUrl, path);
	        var target = this.query.get("@target");
	        if (target !== null) {
	            parent.query.add("@target", target);
	        }
	        return parent;
	    };
	    Queryable.prototype.getImpl = function (getOptions, parser) {
	        var _this = this;
	        if (getOptions === void 0) { getOptions = {}; }
	        if (this._useCaching) {
	            var options = new caching_1.CachingOptions(this.toUrlAndQuery().toLowerCase());
	            if (typeof this._cachingOptions !== "undefined") {
	                options = util_1.Util.extend(options, this._cachingOptions);
	            }
	            // we may not have a valid store, i.e. on node
	            if (options.store !== null) {
	                // check if we have the data in cache and if so return a resolved promise
	                var data_1 = options.store.get(options.key);
	                if (data_1 !== null) {
	                    return new Promise(function (resolve) { return resolve(data_1); });
	                }
	            }
	            // if we don't then wrap the supplied parser in the caching parser wrapper
	            // and send things on their way
	            parser = new caching_1.CachingParserWrapper(parser, options);
	        }
	        if (!this.hasBatch) {
	            // we are not part of a batch, so proceed as normal
	            var client = new httpclient_1.HttpClient();
	            return client.get(this.toUrlAndQuery(), getOptions).then(function (response) {
	                return _this.processHttpClientResponse(response, parser);
	            });
	        }
	        else {
	            return this._batch.add(this.toUrlAndQuery(), "GET", getOptions, parser);
	        }
	    };
	    Queryable.prototype.postImpl = function (postOptions, parser) {
	        var _this = this;
	        if (!this.hasBatch) {
	            // we are not part of a batch, so proceed as normal
	            var client = new httpclient_1.HttpClient();
	            return client.post(this.toUrlAndQuery(), postOptions).then(function (response) {
	                return _this.processHttpClientResponse(response, parser);
	            });
	        }
	        else {
	            return this._batch.add(this.toUrlAndQuery(), "POST", postOptions, parser);
	        }
	    };
	    Queryable.prototype.patchImpl = function (patchOptions, parser) {
	        var _this = this;
	        if (!this.hasBatch) {
	            // we are not part of a batch, so proceed as normal
	            var client = new httpclient_1.HttpClient();
	            return client.patch(this.toUrlAndQuery(), patchOptions).then(function (response) {
	                return _this.processHttpClientResponse(response, parser);
	            });
	        }
	        else {
	            return this._batch.add(this.toUrlAndQuery(), "PATCH", patchOptions, parser);
	        }
	    };
	    Queryable.prototype.deleteImpl = function (deleteOptions, parser) {
	        var _this = this;
	        if (!this.hasBatch) {
	            // we are not part of a batch, so proceed as normal
	            var client = new httpclient_1.HttpClient();
	            return client.delete(this.toUrlAndQuery(), deleteOptions).then(function (response) {
	                return _this.processHttpClientResponse(response, parser);
	            });
	        }
	        else {
	            return this._batch.add(this.toUrlAndQuery(), "DELETE", deleteOptions, parser);
	        }
	    };
	    Queryable.prototype.processHttpClientResponse = function (response, parser) {
	        // 200 = OK (get, delete)
	        // 201 = Created (create)
	        // 204 = No Content (update)
	        if (!response.ok) {
	            response.text().then(function (text) {
	                logging_1.Logger.log({
	                    data: response,
	                    level: logging_1.LogLevel.Error,
	                    message: text,
	                });
	                throw "Error making HttpClient request in queryable: " + response.statusText;
	            });
	        }
	        if ((response.headers.has("Content-Length") && parseFloat(response.headers.get("Content-Length")) === 0)
	            || response.status === 204) {
	            // in these cases the server has returned no content, so we create an empty object
	            // this was done because the fetch browser methods throw exceptions with no content
	            return new Promise(function (resolve, reject) { resolve({}); });
	        }
	        // pipe our parsed content
	        return parser.parse(response);
	    };
	    return Queryable;
	}());
	exports.Queryable = Queryable;
	/**
	 * Represents a REST collection which can be filtered, paged, and selected
	 *
	 */
	var QueryableCollection = (function (_super) {
	    __extends(QueryableCollection, _super);
	    function QueryableCollection() {
	        _super.apply(this, arguments);
	    }
	    /**
	     * Filters the returned collection (https://msdn.microsoft.com/en-us/library/office/fp142385.aspx#bk_supported)
	     *
	     * @param filter The string representing the filter query
	     */
	    QueryableCollection.prototype.filter = function (filter) {
	        this._query.add("$filter", filter);
	        return this;
	    };
	    /**
	     * Choose which fields to return
	     *
	     * @param selects One or more fields to return
	     */
	    QueryableCollection.prototype.select = function () {
	        var selects = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            selects[_i - 0] = arguments[_i];
	        }
	        this._query.add("$select", selects.join(","));
	        return this;
	    };
	    /**
	     * Expands fields such as lookups to get additional data
	     *
	     * @param expands The Fields for which to expand the values
	     */
	    QueryableCollection.prototype.expand = function () {
	        var expands = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            expands[_i - 0] = arguments[_i];
	        }
	        this._query.add("$expand", expands.join(","));
	        return this;
	    };
	    /**
	     * Orders based on the supplied fields ascending
	     *
	     * @param orderby The name of the field to sort on
	     * @param ascending If false DESC is appended, otherwise ASC (default)
	     */
	    QueryableCollection.prototype.orderBy = function (orderBy, ascending) {
	        if (ascending === void 0) { ascending = true; }
	        var keys = this._query.getKeys();
	        var query = [];
	        var asc = ascending ? " asc" : " desc";
	        for (var i = 0; i < keys.length; i++) {
	            if (keys[i] === "$orderby") {
	                query.push(this._query.get("$orderby"));
	                break;
	            }
	        }
	        query.push("" + orderBy + asc);
	        this._query.add("$orderby", query.join(","));
	        return this;
	    };
	    /**
	     * Skips the specified number of items
	     *
	     * @param skip The number of items to skip
	     */
	    QueryableCollection.prototype.skip = function (skip) {
	        this._query.add("$skip", skip.toString());
	        return this;
	    };
	    /**
	     * Limits the query to only return the specified number of items
	     *
	     * @param top The query row limit
	     */
	    QueryableCollection.prototype.top = function (top) {
	        this._query.add("$top", top.toString());
	        return this;
	    };
	    return QueryableCollection;
	}(Queryable));
	exports.QueryableCollection = QueryableCollection;
	/**
	 * Represents an instance that can be selected
	 *
	 */
	var QueryableInstance = (function (_super) {
	    __extends(QueryableInstance, _super);
	    function QueryableInstance() {
	        _super.apply(this, arguments);
	    }
	    /**
	     * Choose which fields to return
	     *
	     * @param selects One or more fields to return
	     */
	    QueryableInstance.prototype.select = function () {
	        var selects = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            selects[_i - 0] = arguments[_i];
	        }
	        this._query.add("$select", selects.join(","));
	        return this;
	    };
	    /**
	     * Expands fields such as lookups to get additional data
	     *
	     * @param expands The Fields for which to expand the values
	     */
	    QueryableInstance.prototype.expand = function () {
	        var expands = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            expands[_i - 0] = arguments[_i];
	        }
	        this._query.add("$expand", expands.join(","));
	        return this;
	    };
	    return QueryableInstance;
	}(Queryable));
	exports.QueryableInstance = QueryableInstance;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var fetchclient_1 = __webpack_require__(17);
	var digestcache_1 = __webpack_require__(18);
	var util_1 = __webpack_require__(5);
	var pnplibconfig_1 = __webpack_require__(20);
	var sprequestexecutorclient_1 = __webpack_require__(21);
	var nodefetchclient_1 = __webpack_require__(22);
	var HttpClient = (function () {
	    function HttpClient() {
	        this._impl = this.getFetchImpl();
	        this._digestCache = new digestcache_1.DigestCache(this);
	    }
	    HttpClient.prototype.fetch = function (url, options) {
	        if (options === void 0) { options = {}; }
	        var self = this;
	        var opts = util_1.Util.extend(options, { cache: "no-cache", credentials: "same-origin" }, true);
	        var headers = new Headers();
	        // first we add the global headers so they can be overwritten by any passed in locally to this call
	        this.mergeHeaders(headers, pnplibconfig_1.RuntimeConfig.headers);
	        // second we add the local options so we can overwrite the globals
	        this.mergeHeaders(headers, options.headers);
	        // lastly we apply any default headers we need that may not exist
	        if (!headers.has("Accept")) {
	            headers.append("Accept", "application/json");
	        }
	        if (!headers.has("Content-Type")) {
	            headers.append("Content-Type", "application/json;odata=verbose;charset=utf-8");
	        }
	        if (!headers.has("X-ClientService-ClientTag")) {
	            headers.append("X-ClientService-ClientTag", "PnPCoreJS:1.0.6");
	        }
	        opts = util_1.Util.extend(opts, { headers: headers });
	        if (opts.method && opts.method.toUpperCase() !== "GET") {
	            if (!headers.has("X-RequestDigest")) {
	                var index = url.indexOf("_api/");
	                if (index < 0) {
	                    throw new Error("Unable to determine API url");
	                }
	                var webUrl = url.substr(0, index);
	                return this._digestCache.getDigest(webUrl)
	                    .then(function (digest) {
	                    headers.append("X-RequestDigest", digest);
	                    return self.fetchRaw(url, opts);
	                });
	            }
	        }
	        return self.fetchRaw(url, opts);
	    };
	    HttpClient.prototype.fetchRaw = function (url, options) {
	        var _this = this;
	        if (options === void 0) { options = {}; }
	        // here we need to normalize the headers
	        var rawHeaders = new Headers();
	        this.mergeHeaders(rawHeaders, options.headers);
	        options = util_1.Util.extend(options, { headers: rawHeaders });
	        var retry = function (ctx) {
	            _this._impl.fetch(url, options).then(function (response) { return ctx.resolve(response); }).catch(function (response) {
	                // grab our current delay
	                var delay = ctx.delay;
	                // Check if request was throttled - http status code 429 
	                // Check is request failed due to server unavailable - http status code 503 
	                if (response.status !== 429 && response.status !== 503) {
	                    ctx.reject(response);
	                }
	                // Increment our counters.
	                ctx.delay *= 2;
	                ctx.attempts++;
	                // If we have exceeded the retry count, reject.
	                if (ctx.retryCount <= ctx.attempts) {
	                    ctx.reject(response);
	                }
	                // Set our retry timeout for {delay} milliseconds.
	                setTimeout(util_1.Util.getCtxCallback(_this, retry, ctx), delay);
	            });
	        };
	        return new Promise(function (resolve, reject) {
	            var retryContext = {
	                attempts: 0,
	                delay: 100,
	                reject: reject,
	                resolve: resolve,
	                retryCount: 7,
	            };
	            retry.call(_this, retryContext);
	        });
	    };
	    HttpClient.prototype.get = function (url, options) {
	        if (options === void 0) { options = {}; }
	        var opts = util_1.Util.extend(options, { method: "GET" });
	        return this.fetch(url, opts);
	    };
	    HttpClient.prototype.post = function (url, options) {
	        if (options === void 0) { options = {}; }
	        var opts = util_1.Util.extend(options, { method: "POST" });
	        return this.fetch(url, opts);
	    };
	    HttpClient.prototype.patch = function (url, options) {
	        if (options === void 0) { options = {}; }
	        var opts = util_1.Util.extend(options, { method: "PATCH" });
	        return this.fetch(url, opts);
	    };
	    HttpClient.prototype.delete = function (url, options) {
	        if (options === void 0) { options = {}; }
	        var opts = util_1.Util.extend(options, { method: "DELETE" });
	        return this.fetch(url, opts);
	    };
	    HttpClient.prototype.getFetchImpl = function () {
	        if (pnplibconfig_1.RuntimeConfig.useSPRequestExecutor) {
	            return new sprequestexecutorclient_1.SPRequestExecutorClient();
	        }
	        else if (pnplibconfig_1.RuntimeConfig.useNodeFetchClient) {
	            var opts = pnplibconfig_1.RuntimeConfig.nodeRequestOptions;
	            return new nodefetchclient_1.NodeFetchClient(opts.siteUrl, opts.clientId, opts.clientSecret);
	        }
	        else {
	            return new fetchclient_1.FetchClient();
	        }
	    };
	    HttpClient.prototype.mergeHeaders = function (target, source) {
	        if (typeof source !== "undefined" && source !== null) {
	            var temp = new Request("", { headers: source });
	            temp.headers.forEach(function (value, name) {
	                target.append(name, value);
	            });
	        }
	    };
	    return HttpClient;
	}());
	exports.HttpClient = HttpClient;


/***/ },
/* 17 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	/**
	 * Makes requests using the fetch API
	 */
	var FetchClient = (function () {
	    function FetchClient() {
	    }
	    FetchClient.prototype.fetch = function (url, options) {
	        return global.fetch(url, options);
	    };
	    return FetchClient;
	}());
	exports.FetchClient = FetchClient;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var collections_1 = __webpack_require__(8);
	var util_1 = __webpack_require__(5);
	var odata_1 = __webpack_require__(19);
	var CachedDigest = (function () {
	    function CachedDigest() {
	    }
	    return CachedDigest;
	}());
	exports.CachedDigest = CachedDigest;
	var DigestCache = (function () {
	    function DigestCache(_httpClient, _digests) {
	        if (_digests === void 0) { _digests = new collections_1.Dictionary(); }
	        this._httpClient = _httpClient;
	        this._digests = _digests;
	    }
	    DigestCache.prototype.getDigest = function (webUrl) {
	        var self = this;
	        var cachedDigest = this._digests.get(webUrl);
	        if (cachedDigest !== null) {
	            var now = new Date();
	            if (now < cachedDigest.expiration) {
	                return Promise.resolve(cachedDigest.value);
	            }
	        }
	        var url = util_1.Util.combinePaths(webUrl, "/_api/contextinfo");
	        return self._httpClient.fetchRaw(url, {
	            cache: "no-cache",
	            credentials: "same-origin",
	            headers: {
	                "Accept": "application/json;odata=verbose",
	                "Content-type": "application/json;odata=verbose;charset=utf-8",
	            },
	            method: "POST",
	        }).then(function (response) {
	            var parser = new odata_1.ODataDefaultParser();
	            return parser.parse(response).then(function (d) { return d.GetContextWebInformation; });
	        }).then(function (data) {
	            var newCachedDigest = new CachedDigest();
	            newCachedDigest.value = data.FormDigestValue;
	            var seconds = data.FormDigestTimeoutSeconds;
	            var expiration = new Date();
	            expiration.setTime(expiration.getTime() + 1000 * seconds);
	            newCachedDigest.expiration = expiration;
	            self._digests.add(webUrl, newCachedDigest);
	            return newCachedDigest.value;
	        });
	    };
	    DigestCache.prototype.clear = function () {
	        this._digests.clear();
	    };
	    return DigestCache;
	}());
	exports.DigestCache = DigestCache;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var util_1 = __webpack_require__(5);
	var logging_1 = __webpack_require__(12);
	var httpclient_1 = __webpack_require__(16);
	var pnplibconfig_1 = __webpack_require__(20);
	function extractOdataId(candidate) {
	    if (candidate.hasOwnProperty("odata.id")) {
	        return candidate["odata.id"];
	    }
	    else if (candidate.hasOwnProperty("__metadata") && candidate.__metadata.hasOwnProperty("id")) {
	        return candidate.__metadata.id;
	    }
	    else {
	        logging_1.Logger.log({
	            data: candidate,
	            level: logging_1.LogLevel.Error,
	            message: "Could not extract odata id in object, you may be using nometadata. Object data logged to logger.",
	        });
	        throw new Error("Could not extract odata id in object, you may be using nometadata. Object data logged to logger.");
	    }
	}
	exports.extractOdataId = extractOdataId;
	var ODataParserBase = (function () {
	    function ODataParserBase() {
	    }
	    ODataParserBase.prototype.parse = function (r) {
	        var _this = this;
	        return r.json().then(function (json) { return _this.parseODataJSON(json); });
	    };
	    ODataParserBase.prototype.parseODataJSON = function (json) {
	        var result = json;
	        if (json.hasOwnProperty("d")) {
	            if (json.d.hasOwnProperty("results")) {
	                result = json.d.results;
	            }
	            else {
	                result = json.d;
	            }
	        }
	        else if (json.hasOwnProperty("value")) {
	            result = json.value;
	        }
	        return result;
	    };
	    return ODataParserBase;
	}());
	exports.ODataParserBase = ODataParserBase;
	var ODataDefaultParser = (function (_super) {
	    __extends(ODataDefaultParser, _super);
	    function ODataDefaultParser() {
	        _super.apply(this, arguments);
	    }
	    return ODataDefaultParser;
	}(ODataParserBase));
	exports.ODataDefaultParser = ODataDefaultParser;
	var ODataRawParserImpl = (function () {
	    function ODataRawParserImpl() {
	    }
	    ODataRawParserImpl.prototype.parse = function (r) {
	        return r.json();
	    };
	    return ODataRawParserImpl;
	}());
	exports.ODataRawParserImpl = ODataRawParserImpl;
	var ODataValueParserImpl = (function (_super) {
	    __extends(ODataValueParserImpl, _super);
	    function ODataValueParserImpl() {
	        _super.apply(this, arguments);
	    }
	    ODataValueParserImpl.prototype.parse = function (r) {
	        return _super.prototype.parse.call(this, r).then(function (d) { return d; });
	    };
	    return ODataValueParserImpl;
	}(ODataParserBase));
	var ODataEntityParserImpl = (function (_super) {
	    __extends(ODataEntityParserImpl, _super);
	    function ODataEntityParserImpl(factory) {
	        _super.call(this);
	        this.factory = factory;
	    }
	    ODataEntityParserImpl.prototype.parse = function (r) {
	        var _this = this;
	        return _super.prototype.parse.call(this, r).then(function (d) {
	            var o = new _this.factory(getEntityUrl(d), null);
	            return util_1.Util.extend(o, d);
	        });
	    };
	    return ODataEntityParserImpl;
	}(ODataParserBase));
	var ODataEntityArrayParserImpl = (function (_super) {
	    __extends(ODataEntityArrayParserImpl, _super);
	    function ODataEntityArrayParserImpl(factory) {
	        _super.call(this);
	        this.factory = factory;
	    }
	    ODataEntityArrayParserImpl.prototype.parse = function (r) {
	        var _this = this;
	        return _super.prototype.parse.call(this, r).then(function (d) {
	            return d.map(function (v) {
	                var o = new _this.factory(getEntityUrl(v), null);
	                return util_1.Util.extend(o, v);
	            });
	        });
	    };
	    return ODataEntityArrayParserImpl;
	}(ODataParserBase));
	function getEntityUrl(entity) {
	    if (entity.hasOwnProperty("__metadata")) {
	        // we are dealing with verbose, which has an absolute uri
	        return entity.__metadata.uri;
	    }
	    else if (entity.hasOwnProperty("odata.editLink")) {
	        // we are dealign with minimal metadata (default)
	        return util_1.Util.combinePaths("_api", entity["odata.editLink"]);
	    }
	    else {
	        // we are likely dealing with nometadata, so don't error but we won't be able to
	        // chain off these objects (write something to log?)
	        logging_1.Logger.write("No uri information found in ODataEntity parsing, chaining will fail for this object.", logging_1.LogLevel.Warning);
	        return "";
	    }
	}
	exports.ODataRaw = new ODataRawParserImpl();
	function ODataValue() {
	    return new ODataValueParserImpl();
	}
	exports.ODataValue = ODataValue;
	function ODataEntity(factory) {
	    return new ODataEntityParserImpl(factory);
	}
	exports.ODataEntity = ODataEntity;
	function ODataEntityArray(factory) {
	    return new ODataEntityArrayParserImpl(factory);
	}
	exports.ODataEntityArray = ODataEntityArray;
	/**
	 * Manages a batch of OData operations
	 */
	var ODataBatch = (function () {
	    function ODataBatch(baseUrl, _batchId) {
	        if (_batchId === void 0) { _batchId = util_1.Util.getGUID(); }
	        this.baseUrl = baseUrl;
	        this._batchId = _batchId;
	        this._requests = [];
	        this._batchDependencies = Promise.resolve();
	    }
	    /**
	     * Adds a request to a batch (not designed for public use)
	     *
	     * @param url The full url of the request
	     * @param method The http method GET, POST, etc
	     * @param options Any options to include in the request
	     * @param parser The parser that will hadle the results of the request
	     */
	    ODataBatch.prototype.add = function (url, method, options, parser) {
	        var info = {
	            method: method.toUpperCase(),
	            options: options,
	            parser: parser,
	            reject: null,
	            resolve: null,
	            url: url,
	        };
	        var p = new Promise(function (resolve, reject) {
	            info.resolve = resolve;
	            info.reject = reject;
	        });
	        this._requests.push(info);
	        return p;
	    };
	    ODataBatch.prototype.addBatchDependency = function () {
	        var resolver;
	        var promise = new Promise(function (resolve) {
	            resolver = resolve;
	        });
	        this._batchDependencies = this._batchDependencies.then(function () { return promise; });
	        return resolver;
	    };
	    /**
	     * Execute the current batch and resolve the associated promises
	     *
	     * @returns A promise which will be resolved once all of the batch's child promises have resolved
	     */
	    ODataBatch.prototype.execute = function () {
	        var _this = this;
	        return this._batchDependencies.then(function () { return _this.executeImpl(); });
	    };
	    ODataBatch.prototype.executeImpl = function () {
	        var _this = this;
	        // if we don't have any requests, don't bother sending anything
	        // this could be due to caching further upstream, or just an empty batch 
	        if (this._requests.length < 1) {
	            return Promise.resolve();
	        }
	        // build all the requests, send them, pipe results in order to parsers
	        var batchBody = [];
	        var currentChangeSetId = "";
	        this._requests.forEach(function (reqInfo, index) {
	            if (reqInfo.method === "GET") {
	                if (currentChangeSetId.length > 0) {
	                    // end an existing change set
	                    batchBody.push("--changeset_" + currentChangeSetId + "--\n\n");
	                    currentChangeSetId = "";
	                }
	                batchBody.push("--batch_" + _this._batchId + "\n");
	            }
	            else {
	                if (currentChangeSetId.length < 1) {
	                    // start new change set
	                    currentChangeSetId = util_1.Util.getGUID();
	                    batchBody.push("--batch_" + _this._batchId + "\n");
	                    batchBody.push("Content-Type: multipart/mixed; boundary=\"changeset_" + currentChangeSetId + "\"\n\n");
	                }
	                batchBody.push("--changeset_" + currentChangeSetId + "\n");
	            }
	            // common batch part prefix
	            batchBody.push("Content-Type: application/http\n");
	            batchBody.push("Content-Transfer-Encoding: binary\n\n");
	            var headers = {
	                "Accept": "application/json;",
	            };
	            if (reqInfo.method !== "GET") {
	                var method = reqInfo.method;
	                if (reqInfo.options && reqInfo.options.headers && reqInfo.options.headers["X-HTTP-Method"] !== typeof undefined) {
	                    method = reqInfo.options.headers["X-HTTP-Method"];
	                    delete reqInfo.options.headers["X-HTTP-Method"];
	                }
	                batchBody.push(method + " " + reqInfo.url + " HTTP/1.1\n");
	                headers = util_1.Util.extend(headers, { "Content-Type": "application/json;odata=verbose;charset=utf-8" });
	            }
	            else {
	                batchBody.push(reqInfo.method + " " + reqInfo.url + " HTTP/1.1\n");
	            }
	            if (typeof pnplibconfig_1.RuntimeConfig.headers !== "undefined") {
	                headers = util_1.Util.extend(headers, pnplibconfig_1.RuntimeConfig.headers);
	            }
	            if (reqInfo.options && reqInfo.options.headers) {
	                headers = util_1.Util.extend(headers, reqInfo.options.headers);
	            }
	            for (var name_1 in headers) {
	                if (headers.hasOwnProperty(name_1)) {
	                    batchBody.push(name_1 + ": " + headers[name_1] + "\n");
	                }
	            }
	            batchBody.push("\n");
	            if (reqInfo.options.body) {
	                batchBody.push(reqInfo.options.body + "\n\n");
	            }
	        });
	        if (currentChangeSetId.length > 0) {
	            // Close the changeset
	            batchBody.push("--changeset_" + currentChangeSetId + "--\n\n");
	            currentChangeSetId = "";
	        }
	        batchBody.push("--batch_" + this._batchId + "--\n");
	        var batchHeaders = {
	            "Content-Type": "multipart/mixed; boundary=batch_" + this._batchId,
	        };
	        var batchOptions = {
	            "body": batchBody.join(""),
	            "headers": batchHeaders,
	        };
	        var client = new httpclient_1.HttpClient();
	        var requestUrl = util_1.Util.makeUrlAbsolute(util_1.Util.combinePaths(this.baseUrl, "/_api/$batch"));
	        return client.post(requestUrl, batchOptions)
	            .then(function (r) { return r.text(); })
	            .then(this._parseResponse)
	            .then(function (responses) {
	            if (responses.length !== _this._requests.length) {
	                // this is unfortunate
	                throw new Error("Could not properly parse responses to match requests in batch.");
	            }
	            var chain = Promise.resolve();
	            var _loop_1 = function(i) {
	                var request = _this._requests[i];
	                var response = responses[i];
	                if (!response.ok) {
	                    request.reject(new Error(response.statusText));
	                }
	                chain = chain.then(function (_) { return request.parser.parse(response).then(request.resolve).catch(request.reject); });
	            };
	            for (var i = 0; i < responses.length; i++) {
	                _loop_1(i);
	            }
	            return chain;
	        });
	    };
	    /**
	     * Parses the response from a batch request into an array of Response instances
	     *
	     * @param body Text body of the response from the batch request
	     */
	    ODataBatch.prototype._parseResponse = function (body) {
	        return new Promise(function (resolve, reject) {
	            var responses = [];
	            var header = "--batchresponse_";
	            // Ex. "HTTP/1.1 500 Internal Server Error"
	            var statusRegExp = new RegExp("^HTTP/[0-9.]+ +([0-9]+) +(.*)", "i");
	            var lines = body.split("\n");
	            var state = "batch";
	            var status;
	            var statusText;
	            for (var i = 0; i < lines.length; ++i) {
	                var line = lines[i];
	                switch (state) {
	                    case "batch":
	                        if (line.substr(0, header.length) === header) {
	                            state = "batchHeaders";
	                        }
	                        else {
	                            if (line.trim() !== "") {
	                                throw new Error("Invalid response, line " + i);
	                            }
	                        }
	                        break;
	                    case "batchHeaders":
	                        if (line.trim() === "") {
	                            state = "status";
	                        }
	                        break;
	                    case "status":
	                        var parts = statusRegExp.exec(line);
	                        if (parts.length !== 3) {
	                            throw new Error("Invalid status, line " + i);
	                        }
	                        status = parseInt(parts[1], 10);
	                        statusText = parts[2];
	                        state = "statusHeaders";
	                        break;
	                    case "statusHeaders":
	                        if (line.trim() === "") {
	                            state = "body";
	                        }
	                        break;
	                    case "body":
	                        var response = void 0;
	                        if (status === 204) {
	                            // https://github.com/whatwg/fetch/issues/178
	                            response = new Response();
	                        }
	                        else {
	                            response = new Response(line, { status: status, statusText: statusText });
	                        }
	                        responses.push(response);
	                        state = "batch";
	                        break;
	                }
	            }
	            if (state !== "status") {
	                reject(new Error("Unexpected end of input"));
	            }
	            resolve(responses);
	        });
	    };
	    return ODataBatch;
	}());
	exports.ODataBatch = ODataBatch;


/***/ },
/* 20 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	var RuntimeConfigImpl = (function () {
	    function RuntimeConfigImpl() {
	        // these are our default values for the library
	        this._headers = null;
	        this._defaultCachingStore = "session";
	        this._defaultCachingTimeoutSeconds = 30;
	        this._globalCacheDisable = false;
	        this._useSPRequestExecutor = false;
	    }
	    RuntimeConfigImpl.prototype.set = function (config) {
	        if (config.hasOwnProperty("headers")) {
	            this._headers = config.headers;
	        }
	        if (config.hasOwnProperty("globalCacheDisable")) {
	            this._globalCacheDisable = config.globalCacheDisable;
	        }
	        if (config.hasOwnProperty("defaultCachingStore")) {
	            this._defaultCachingStore = config.defaultCachingStore;
	        }
	        if (config.hasOwnProperty("defaultCachingTimeoutSeconds")) {
	            this._defaultCachingTimeoutSeconds = config.defaultCachingTimeoutSeconds;
	        }
	        if (config.hasOwnProperty("useSPRequestExecutor")) {
	            this._useSPRequestExecutor = config.useSPRequestExecutor;
	        }
	        if (config.hasOwnProperty("nodeClientOptions")) {
	            this._useNodeClient = true;
	            this._useSPRequestExecutor = false; // just don't allow this conflict
	            this._nodeClientData = config.nodeClientOptions;
	            // this is to help things work when running in node.js, specifically batching
	            // we shim the _spPageContextInfo object
	            global._spPageContextInfo = {
	                webAbsoluteUrl: config.nodeClientOptions.siteUrl,
	            };
	        }
	    };
	    Object.defineProperty(RuntimeConfigImpl.prototype, "headers", {
	        get: function () {
	            return this._headers;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(RuntimeConfigImpl.prototype, "defaultCachingStore", {
	        get: function () {
	            return this._defaultCachingStore;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(RuntimeConfigImpl.prototype, "defaultCachingTimeoutSeconds", {
	        get: function () {
	            return this._defaultCachingTimeoutSeconds;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(RuntimeConfigImpl.prototype, "globalCacheDisable", {
	        get: function () {
	            return this._globalCacheDisable;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(RuntimeConfigImpl.prototype, "useSPRequestExecutor", {
	        get: function () {
	            return this._useSPRequestExecutor;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(RuntimeConfigImpl.prototype, "useNodeFetchClient", {
	        get: function () {
	            return this._useNodeClient;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(RuntimeConfigImpl.prototype, "nodeRequestOptions", {
	        get: function () {
	            return this._nodeClientData;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return RuntimeConfigImpl;
	}());
	exports.RuntimeConfigImpl = RuntimeConfigImpl;
	var _runtimeConfig = new RuntimeConfigImpl();
	exports.RuntimeConfig = _runtimeConfig;
	function setRuntimeConfig(config) {
	    _runtimeConfig.set(config);
	}
	exports.setRuntimeConfig = setRuntimeConfig;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var util_1 = __webpack_require__(5);
	/**
	 * Makes requests using the SP.RequestExecutor library.
	 */
	var SPRequestExecutorClient = (function () {
	    function SPRequestExecutorClient() {
	        /**
	         * Converts a SharePoint REST API response to a fetch API response.
	         */
	        this.convertToResponse = function (spResponse) {
	            var responseHeaders = new Headers();
	            for (var h in spResponse.headers) {
	                if (spResponse.headers[h]) {
	                    responseHeaders.append(h, spResponse.headers[h]);
	                }
	            }
	            return new Response(spResponse.body, {
	                headers: responseHeaders,
	                status: spResponse.statusCode,
	                statusText: spResponse.statusText,
	            });
	        };
	    }
	    /**
	     * Fetches a URL using the SP.RequestExecutor library.
	     */
	    SPRequestExecutorClient.prototype.fetch = function (url, options) {
	        var _this = this;
	        if (typeof SP === "undefined" || typeof SP.RequestExecutor === "undefined") {
	            throw new Error("SP.RequestExecutor is undefined. " +
	                "Load the SP.RequestExecutor.js library (/_layouts/15/SP.RequestExecutor.js) before loading the PnP JS Core library.");
	        }
	        var addinWebUrl = url.substring(0, url.indexOf("/_api")), executor = new SP.RequestExecutor(addinWebUrl), headers = {}, iterator, temp;
	        if (options.headers && options.headers instanceof Headers) {
	            iterator = options.headers.entries();
	            temp = iterator.next();
	            while (!temp.done) {
	                headers[temp.value[0]] = temp.value[1];
	                temp = iterator.next();
	            }
	        }
	        else {
	            headers = options.headers;
	        }
	        return new Promise(function (resolve, reject) {
	            var requestOptions = {
	                error: function (error) {
	                    reject(_this.convertToResponse(error));
	                },
	                headers: headers,
	                method: options.method,
	                success: function (response) {
	                    resolve(_this.convertToResponse(response));
	                },
	                url: url,
	            };
	            if (options.body) {
	                util_1.Util.extend(requestOptions, { body: options.body });
	            }
	            else {
	                util_1.Util.extend(requestOptions, { binaryStringRequestBody: true });
	            }
	            executor.executeAsync(requestOptions);
	        });
	    };
	    return SPRequestExecutorClient;
	}());
	exports.SPRequestExecutorClient = SPRequestExecutorClient;


/***/ },
/* 22 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * This module is substituted for the NodeFetchClient.ts during the packaging process. This helps to reduce the pnp.js file size by
	 * not including all of the node dependencies
	 */
	var NodeFetchClient = (function () {
	    function NodeFetchClient(siteUrl, _clientId, _clientSecret, _realm) {
	        if (_realm === void 0) { _realm = ""; }
	        this.siteUrl = siteUrl;
	        this._clientId = _clientId;
	        this._clientSecret = _clientSecret;
	        this._realm = _realm;
	    }
	    /**
	     * Always throws an error that NodeFetchClient is not supported for use in the browser
	     */
	    NodeFetchClient.prototype.fetch = function (url, options) {
	        throw new Error("Using NodeFetchClient in the browser is not supported.");
	    };
	    return NodeFetchClient;
	}());
	exports.NodeFetchClient = NodeFetchClient;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var storage_1 = __webpack_require__(6);
	var util_1 = __webpack_require__(5);
	var pnplibconfig_1 = __webpack_require__(20);
	var CachingOptions = (function () {
	    function CachingOptions(key) {
	        this.key = key;
	        this.expiration = util_1.Util.dateAdd(new Date(), "second", pnplibconfig_1.RuntimeConfig.defaultCachingTimeoutSeconds);
	        this.storeName = pnplibconfig_1.RuntimeConfig.defaultCachingStore;
	    }
	    Object.defineProperty(CachingOptions.prototype, "store", {
	        get: function () {
	            if (this.storeName === "local") {
	                return CachingOptions.storage.local;
	            }
	            else {
	                return CachingOptions.storage.session;
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    CachingOptions.storage = new storage_1.PnPClientStorage();
	    return CachingOptions;
	}());
	exports.CachingOptions = CachingOptions;
	var CachingParserWrapper = (function () {
	    function CachingParserWrapper(_parser, _cacheOptions) {
	        this._parser = _parser;
	        this._cacheOptions = _cacheOptions;
	    }
	    CachingParserWrapper.prototype.parse = function (response) {
	        var _this = this;
	        // add this to the cache based on the options
	        return this._parser.parse(response).then(function (data) {
	            if (_this._cacheOptions.store !== null) {
	                _this._cacheOptions.store.put(_this._cacheOptions.key, data, _this._cacheOptions.expiration);
	            }
	            return data;
	        });
	    };
	    return CachingParserWrapper;
	}());
	exports.CachingParserWrapper = CachingParserWrapper;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var queryable_1 = __webpack_require__(15);
	var SearchSuggest = (function (_super) {
	    __extends(SearchSuggest, _super);
	    function SearchSuggest(baseUrl, path) {
	        if (path === void 0) { path = "_api/search/suggest"; }
	        _super.call(this, baseUrl, path);
	    }
	    SearchSuggest.prototype.execute = function (query) {
	        this.mapQueryToQueryString(query);
	        return this.get().then(function (response) { return new SearchSuggestResult(response); });
	    };
	    SearchSuggest.prototype.mapQueryToQueryString = function (query) {
	        this.query.add("querytext", "'" + query.querytext + "'");
	        if (query.hasOwnProperty("count")) {
	            this.query.add("inumberofquerysuggestions", query.count.toString());
	        }
	        if (query.hasOwnProperty("personalCount")) {
	            this.query.add("inumberofresultsuggestions", query.personalCount.toString());
	        }
	        if (query.hasOwnProperty("preQuery")) {
	            this.query.add("fprequerysuggestions", query.preQuery.toString());
	        }
	        if (query.hasOwnProperty("hitHighlighting")) {
	            this.query.add("fhithighlighting", query.hitHighlighting.toString());
	        }
	        if (query.hasOwnProperty("capitalize")) {
	            this.query.add("fcapitalizefirstletters", query.capitalize.toString());
	        }
	        if (query.hasOwnProperty("culture")) {
	            this.query.add("culture", query.culture.toString());
	        }
	        if (query.hasOwnProperty("stemming")) {
	            this.query.add("enablestemming", query.stemming.toString());
	        }
	        if (query.hasOwnProperty("includePeople")) {
	            this.query.add("showpeoplenamesuggestions", query.includePeople.toString());
	        }
	        if (query.hasOwnProperty("queryRules")) {
	            this.query.add("enablequeryrules", query.queryRules.toString());
	        }
	        if (query.hasOwnProperty("prefixMatch")) {
	            this.query.add("fprefixmatchallterms", query.prefixMatch.toString());
	        }
	    };
	    return SearchSuggest;
	}(queryable_1.QueryableInstance));
	exports.SearchSuggest = SearchSuggest;
	var SearchSuggestResult = (function () {
	    function SearchSuggestResult(json) {
	        if (json.hasOwnProperty("suggest")) {
	            // verbose
	            this.PeopleNames = json.suggest.PeopleNames.results;
	            this.PersonalResults = json.suggest.PersonalResults.results;
	            this.Queries = json.suggest.Queries.results;
	        }
	        else {
	            this.PeopleNames = json.PeopleNames;
	            this.PersonalResults = json.PersonalResults;
	            this.Queries = json.Queries;
	        }
	    }
	    return SearchSuggestResult;
	}());
	exports.SearchSuggestResult = SearchSuggestResult;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var queryable_1 = __webpack_require__(15);
	var webs_1 = __webpack_require__(26);
	var usercustomactions_1 = __webpack_require__(41);
	var odata_1 = __webpack_require__(19);
	/**
	 * Describes a site collection
	 *
	 */
	var Site = (function (_super) {
	    __extends(Site, _super);
	    /**
	     * Creates a new instance of the RoleAssignments class
	     *
	     * @param baseUrl The url or Queryable which forms the parent of this fields collection
	     */
	    function Site(baseUrl, path) {
	        if (path === void 0) { path = "_api/site"; }
	        _super.call(this, baseUrl, path);
	    }
	    Object.defineProperty(Site.prototype, "rootWeb", {
	        /**
	         * Gets the root web of the site collection
	         *
	         */
	        get: function () {
	            return new webs_1.Web(this, "rootweb");
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Site.prototype, "userCustomActions", {
	        /**
	         * Get all custom actions on a site collection
	         *
	         */
	        get: function () {
	            return new usercustomactions_1.UserCustomActions(this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Gets the context information for the site.
	     */
	    Site.prototype.getContextInfo = function () {
	        var q = new Site("", "_api/contextinfo");
	        return q.post().then(function (data) {
	            if (data.hasOwnProperty("GetContextWebInformation")) {
	                var info = data.GetContextWebInformation;
	                info.SupportedSchemaVersions = info.SupportedSchemaVersions.results;
	                return info;
	            }
	            else {
	                return data;
	            }
	        });
	    };
	    /**
	     * Gets the document libraries on a site. Static method. (SharePoint Online only)
	     *
	     * @param absoluteWebUrl The absolute url of the web whose document libraries should be returned
	     */
	    Site.prototype.getDocumentLibraries = function (absoluteWebUrl) {
	        var q = new queryable_1.Queryable("", "_api/sp.web.getdocumentlibraries(@v)");
	        q.query.add("@v", "'" + absoluteWebUrl + "'");
	        return q.get().then(function (data) {
	            if (data.hasOwnProperty("GetDocumentLibraries")) {
	                return data.GetDocumentLibraries;
	            }
	            else {
	                return data;
	            }
	        });
	    };
	    /**
	     * Gets the site URL from a page URL.
	     *
	     * @param absolutePageUrl The absolute url of the page
	     */
	    Site.prototype.getWebUrlFromPageUrl = function (absolutePageUrl) {
	        var q = new queryable_1.Queryable("", "_api/sp.web.getweburlfrompageurl(@v)");
	        q.query.add("@v", "'" + absolutePageUrl + "'");
	        return q.get().then(function (data) {
	            if (data.hasOwnProperty("GetWebUrlFromPageUrl")) {
	                return data.GetWebUrlFromPageUrl;
	            }
	            else {
	                return data;
	            }
	        });
	    };
	    /**
	     * Creates a new batch for requests within the context of context this site
	     *
	     */
	    Site.prototype.createBatch = function () {
	        return new odata_1.ODataBatch(this.parentUrl);
	    };
	    return Site;
	}(queryable_1.QueryableInstance));
	exports.Site = Site;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var queryable_1 = __webpack_require__(15);
	var queryablesecurable_1 = __webpack_require__(27);
	var lists_1 = __webpack_require__(31);
	var fields_1 = __webpack_require__(37);
	var navigation_1 = __webpack_require__(42);
	var sitegroups_1 = __webpack_require__(29);
	var contenttypes_1 = __webpack_require__(35);
	var folders_1 = __webpack_require__(33);
	var roles_1 = __webpack_require__(28);
	var files_1 = __webpack_require__(34);
	var util_1 = __webpack_require__(5);
	var lists_2 = __webpack_require__(31);
	var siteusers_1 = __webpack_require__(30);
	var usercustomactions_1 = __webpack_require__(41);
	var odata_1 = __webpack_require__(19);
	var Webs = (function (_super) {
	    __extends(Webs, _super);
	    function Webs(baseUrl, webPath) {
	        if (webPath === void 0) { webPath = "webs"; }
	        _super.call(this, baseUrl, webPath);
	    }
	    /**
	     * Adds a new web to the collection
	     *
	     * @param title The new web's title
	     * @param url The new web's relative url
	     * @param description The web web's description
	     * @param template The web's template
	     * @param language The language code to use for this web
	     * @param inheritPermissions If true permissions will be inherited from the partent web
	     * @param additionalSettings Will be passed as part of the web creation body
	     */
	    Webs.prototype.add = function (title, url, description, template, language, inheritPermissions, additionalSettings) {
	        if (description === void 0) { description = ""; }
	        if (template === void 0) { template = "STS"; }
	        if (language === void 0) { language = 1033; }
	        if (inheritPermissions === void 0) { inheritPermissions = true; }
	        if (additionalSettings === void 0) { additionalSettings = {}; }
	        var props = util_1.Util.extend({
	            Description: description,
	            Language: language,
	            Title: title,
	            Url: url,
	            UseSamePermissionsAsParentSite: inheritPermissions,
	            WebTemplate: template,
	        }, additionalSettings);
	        var postBody = JSON.stringify({
	            "parameters": util_1.Util.extend({
	                "__metadata": { "type": "SP.WebCreationInformation" },
	            }, props),
	        });
	        var q = new Webs(this, "add");
	        return q.post({ body: postBody }).then(function (data) {
	            return {
	                data: data,
	                web: new Web(odata_1.extractOdataId(data), ""),
	            };
	        });
	    };
	    return Webs;
	}(queryable_1.QueryableCollection));
	exports.Webs = Webs;
	/**
	 * Describes a web
	 *
	 */
	var Web = (function (_super) {
	    __extends(Web, _super);
	    function Web(baseUrl, path) {
	        if (path === void 0) { path = "_api/web"; }
	        _super.call(this, baseUrl, path);
	    }
	    Object.defineProperty(Web.prototype, "webs", {
	        get: function () {
	            return new Webs(this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Web.prototype, "contentTypes", {
	        /**
	         * Get the content types available in this web
	         *
	         */
	        get: function () {
	            return new contenttypes_1.ContentTypes(this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Web.prototype, "lists", {
	        /**
	         * Get the lists in this web
	         *
	         */
	        get: function () {
	            return new lists_1.Lists(this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Web.prototype, "fields", {
	        /**
	         * Gets the fields in this web
	         *
	         */
	        get: function () {
	            return new fields_1.Fields(this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Web.prototype, "availablefields", {
	        /**
	         * Gets the available fields in this web
	         *
	         */
	        get: function () {
	            return new fields_1.Fields(this, "availablefields");
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Web.prototype, "navigation", {
	        /**
	         * Get the navigation options in this web
	         *
	         */
	        get: function () {
	            return new navigation_1.Navigation(this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Web.prototype, "siteUsers", {
	        /**
	         * Gets the site users
	         *
	         */
	        get: function () {
	            return new siteusers_1.SiteUsers(this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Web.prototype, "siteGroups", {
	        /**
	         * Gets the site groups
	         *
	         */
	        get: function () {
	            return new sitegroups_1.SiteGroups(this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Web.prototype, "folders", {
	        /**
	         * Get the folders in this web
	         *
	         */
	        get: function () {
	            return new folders_1.Folders(this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Web.prototype, "userCustomActions", {
	        /**
	         * Get all custom actions on a site
	         *
	         */
	        get: function () {
	            return new usercustomactions_1.UserCustomActions(this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Web.prototype, "roleDefinitions", {
	        /**
	         * Gets the collection of RoleDefinition resources.
	         *
	         */
	        get: function () {
	            return new roles_1.RoleDefinitions(this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Creates a new batch for requests within the context of context this web
	     *
	     */
	    Web.prototype.createBatch = function () {
	        return new odata_1.ODataBatch(this.parentUrl);
	    };
	    /**
	     * Get a folder by server relative url
	     *
	     * @param folderRelativeUrl the server relative path to the folder (including /sites/ if applicable)
	     */
	    Web.prototype.getFolderByServerRelativeUrl = function (folderRelativeUrl) {
	        return new folders_1.Folder(this, "getFolderByServerRelativeUrl('" + folderRelativeUrl + "')");
	    };
	    /**
	     * Get a file by server relative url
	     *
	     * @param fileRelativeUrl the server relative path to the file (including /sites/ if applicable)
	     */
	    Web.prototype.getFileByServerRelativeUrl = function (fileRelativeUrl) {
	        return new files_1.File(this, "getFileByServerRelativeUrl('" + fileRelativeUrl + "')");
	    };
	    /**
	     * Get a list by server relative url (list's root folder)
	     *
	     * @param listRelativeUrl the server relative path to the list's root folder (including /sites/ if applicable)
	     */
	    Web.prototype.getList = function (listRelativeUrl) {
	        return new lists_2.List(this, "getList('" + listRelativeUrl + "')");
	    };
	    /**
	     * Updates this web intance with the supplied properties
	     *
	     * @param properties A plain object hash of values to update for the web
	     */
	    Web.prototype.update = function (properties) {
	        var _this = this;
	        var postBody = JSON.stringify(util_1.Util.extend({
	            "__metadata": { "type": "SP.Web" },
	        }, properties));
	        return this.post({
	            body: postBody,
	            headers: {
	                "X-HTTP-Method": "MERGE",
	            },
	        }).then(function (data) {
	            return {
	                data: data,
	                web: _this,
	            };
	        });
	    };
	    /**
	     * Delete this web
	     *
	     */
	    Web.prototype.delete = function () {
	        return this.post({
	            headers: {
	                "X-HTTP-Method": "DELETE",
	            },
	        });
	    };
	    /**
	     * Applies the theme specified by the contents of each of the files specified in the arguments to the site.
	     *
	     * @param colorPaletteUrl Server-relative URL of the color palette file.
	     * @param fontSchemeUrl Server-relative URL of the font scheme.
	     * @param backgroundImageUrl Server-relative URL of the background image.
	     * @param shareGenerated true to store the generated theme files in the root site, or false to store them in this site.
	     */
	    Web.prototype.applyTheme = function (colorPaletteUrl, fontSchemeUrl, backgroundImageUrl, shareGenerated) {
	        var postBody = JSON.stringify({
	            backgroundImageUrl: backgroundImageUrl,
	            colorPaletteUrl: colorPaletteUrl,
	            fontSchemeUrl: fontSchemeUrl,
	            shareGenerated: shareGenerated,
	        });
	        var q = new Web(this, "applytheme");
	        return q.post({ body: postBody });
	    };
	    /**
	     * Applies the specified site definition or site template to the Web site that has no template applied to it.
	     *
	     * @param template Name of the site definition or the name of the site template
	     */
	    Web.prototype.applyWebTemplate = function (template) {
	        var q = new Web(this, "applywebtemplate");
	        q.concat("(@t)");
	        q.query.add("@t", template);
	        return q.post();
	    };
	    /**
	     * Returns whether the current user has the given set of permissions.
	     *
	     * @param perms The high and low permission range.
	     */
	    Web.prototype.doesUserHavePermissions = function (perms) {
	        var q = new Web(this, "doesuserhavepermissions");
	        q.concat("(@p)");
	        q.query.add("@p", JSON.stringify(perms));
	        return q.get();
	    };
	    /**
	     * Checks whether the specified login name belongs to a valid user in the site. If the user doesn't exist, adds the user to the site.
	     *
	     * @param loginName The login name of the user (ex: i:0#.f|membership|user@domain.onmicrosoft.com)
	     */
	    Web.prototype.ensureUser = function (loginName) {
	        // TODO:: this should resolve to a User
	        var postBody = JSON.stringify({
	            logonName: loginName,
	        });
	        var q = new Web(this, "ensureuser");
	        return q.post({ body: postBody });
	    };
	    /**
	     * Returns a collection of site templates available for the site.
	     *
	     * @param language The LCID of the site templates to get.
	     * @param true to include language-neutral site templates; otherwise false
	     */
	    Web.prototype.availableWebTemplates = function (language, includeCrossLanugage) {
	        if (language === void 0) { language = 1033; }
	        if (includeCrossLanugage === void 0) { includeCrossLanugage = true; }
	        return new queryable_1.QueryableCollection(this, "getavailablewebtemplates(lcid=" + language + ", doincludecrosslanguage=" + includeCrossLanugage + ")");
	    };
	    /**
	     * Returns the list gallery on the site.
	     *
	     * @param type The gallery type - WebTemplateCatalog = 111, WebPartCatalog = 113 ListTemplateCatalog = 114,
	     * MasterPageCatalog = 116, SolutionCatalog = 121, ThemeCatalog = 123, DesignCatalog = 124, AppDataCatalog = 125
	     */
	    /* tslint:disable member-access */
	    Web.prototype.getCatalog = function (type) {
	        var q = new Web(this, "getcatalog(" + type + ")");
	        q.select("Id");
	        return q.get().then(function (data) {
	            return new lists_2.List(odata_1.extractOdataId(data));
	        });
	    };
	    /* tslint:enable */
	    /**
	     * Returns the collection of changes from the change log that have occurred within the list, based on the specified query.
	     */
	    Web.prototype.getChanges = function (query) {
	        var postBody = JSON.stringify({ "query": util_1.Util.extend({ "__metadata": { "type": "SP.ChangeQuery" } }, query) });
	        // don't change "this" instance, make a new one
	        var q = new Web(this, "getchanges");
	        return q.post({ body: postBody });
	    };
	    Object.defineProperty(Web.prototype, "customListTemplate", {
	        /**
	         * Gets the custom list templates for the site.
	         *
	         */
	        get: function () {
	            return new queryable_1.QueryableCollection(this, "getcustomlisttemplates");
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Returns the user corresponding to the specified member identifier for the current site.
	     *
	     * @param id The ID of the user.
	     */
	    Web.prototype.getUserById = function (id) {
	        return new siteusers_1.SiteUser(this, "getUserById(" + id + ")");
	    };
	    /**
	     * Returns the name of the image file for the icon that is used to represent the specified file.
	     *
	     * @param filename The file name. If this parameter is empty, the server returns an empty string.
	     * @param size The size of the icon: 16x16 pixels = 0, 32x32 pixels = 1.
	     * @param progId The ProgID of the application that was used to create the file, in the form OLEServerName.ObjectName
	     */
	    Web.prototype.mapToIcon = function (filename, size, progId) {
	        if (size === void 0) { size = 0; }
	        if (progId === void 0) { progId = ""; }
	        var q = new Web(this, "maptoicon(filename='" + filename + "', progid='" + progId + "', size=" + size + ")");
	        return q.get();
	    };
	    return Web;
	}(queryablesecurable_1.QueryableSecurable));
	exports.Web = Web;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var roles_1 = __webpack_require__(28);
	var queryable_1 = __webpack_require__(15);
	var QueryableSecurable = (function (_super) {
	    __extends(QueryableSecurable, _super);
	    function QueryableSecurable() {
	        _super.apply(this, arguments);
	    }
	    Object.defineProperty(QueryableSecurable.prototype, "roleAssignments", {
	        /**
	         * Gets the set of role assignments for this item
	         *
	         */
	        get: function () {
	            return new roles_1.RoleAssignments(this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(QueryableSecurable.prototype, "firstUniqueAncestorSecurableObject", {
	        /**
	         * Gets the closest securable up the security hierarchy whose permissions are applied to this list item
	         *
	         */
	        get: function () {
	            this.append("FirstUniqueAncestorSecurableObject");
	            return new queryable_1.QueryableInstance(this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Gets the effective permissions for the user supplied
	     *
	     * @param loginName The claims username for the user (ex: i:0#.f|membership|user@domain.com)
	     */
	    QueryableSecurable.prototype.getUserEffectivePermissions = function (loginName) {
	        this.append("getUserEffectivePermissions(@user)");
	        this._query.add("@user", "'" + encodeURIComponent(loginName) + "'");
	        return new queryable_1.Queryable(this);
	    };
	    /**
	     * Breaks the security inheritance at this level optinally copying permissions and clearing subscopes
	     *
	     * @param copyRoleAssignments If true the permissions are copied from the current parent scope
	     * @param clearSubscopes Optional. true to make all child securable objects inherit role assignments from the current object
	     */
	    QueryableSecurable.prototype.breakRoleInheritance = function (copyRoleAssignments, clearSubscopes) {
	        if (copyRoleAssignments === void 0) { copyRoleAssignments = false; }
	        if (clearSubscopes === void 0) { clearSubscopes = false; }
	        var Breaker = (function (_super) {
	            __extends(Breaker, _super);
	            function Breaker(baseUrl, copy, clear) {
	                _super.call(this, baseUrl, "breakroleinheritance(copyroleassignments=" + copy + ", clearsubscopes=" + clear + ")");
	            }
	            Breaker.prototype.break = function () {
	                return this.post();
	            };
	            return Breaker;
	        }(queryable_1.Queryable));
	        var b = new Breaker(this, copyRoleAssignments, clearSubscopes);
	        return b.break();
	    };
	    /**
	     * Breaks the security inheritance at this level optinally copying permissions and clearing subscopes
	     *
	     */
	    QueryableSecurable.prototype.resetRoleInheritance = function () {
	        var Resetter = (function (_super) {
	            __extends(Resetter, _super);
	            function Resetter(baseUrl) {
	                _super.call(this, baseUrl, "resetroleinheritance");
	            }
	            Resetter.prototype.reset = function () {
	                return this.post();
	            };
	            return Resetter;
	        }(queryable_1.Queryable));
	        var r = new Resetter(this);
	        return r.reset();
	    };
	    return QueryableSecurable;
	}(queryable_1.QueryableInstance));
	exports.QueryableSecurable = QueryableSecurable;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var queryable_1 = __webpack_require__(15);
	var sitegroups_1 = __webpack_require__(29);
	var util_1 = __webpack_require__(5);
	/**
	 * Describes a set of role assignments for the current scope
	 *
	 */
	var RoleAssignments = (function (_super) {
	    __extends(RoleAssignments, _super);
	    /**
	     * Creates a new instance of the RoleAssignments class
	     *
	     * @param baseUrl The url or Queryable which forms the parent of this fields collection
	     */
	    function RoleAssignments(baseUrl, path) {
	        if (path === void 0) { path = "roleassignments"; }
	        _super.call(this, baseUrl, path);
	    }
	    /**
	     * Adds a new role assignment with the specified principal and role definitions to the collection.
	     *
	     * @param principalId The ID of the user or group to assign permissions to
	     * @param roleDefId The ID of the role definition that defines the permissions to assign
	     *
	     */
	    RoleAssignments.prototype.add = function (principalId, roleDefId) {
	        var a = new RoleAssignments(this, "addroleassignment(principalid=" + principalId + ", roledefid=" + roleDefId + ")");
	        return a.post();
	    };
	    /**
	     * Removes the role assignment with the specified principal and role definition from the collection
	     *
	     * @param principalId The ID of the user or group in the role assignment.
	     * @param roleDefId The ID of the role definition in the role assignment
	     *
	     */
	    RoleAssignments.prototype.remove = function (principalId, roleDefId) {
	        var a = new RoleAssignments(this, "removeroleassignment(principalid=" + principalId + ", roledefid=" + roleDefId + ")");
	        return a.post();
	    };
	    /**
	     * Gets the role assignment associated with the specified principal ID from the collection.
	     *
	     * @param id The id of the role assignment
	     */
	    RoleAssignments.prototype.getById = function (id) {
	        var ra = new RoleAssignment(this);
	        ra.concat("(" + id + ")");
	        return ra;
	    };
	    return RoleAssignments;
	}(queryable_1.QueryableCollection));
	exports.RoleAssignments = RoleAssignments;
	var RoleAssignment = (function (_super) {
	    __extends(RoleAssignment, _super);
	    /**
	 * Creates a new instance of the RoleAssignment class
	 *
	 * @param baseUrl The url or Queryable which forms the parent of this fields collection
	 */
	    function RoleAssignment(baseUrl, path) {
	        _super.call(this, baseUrl, path);
	    }
	    Object.defineProperty(RoleAssignment.prototype, "groups", {
	        get: function () {
	            return new sitegroups_1.SiteGroups(this, "groups");
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(RoleAssignment.prototype, "bindings", {
	        /**
	         * Get the role definition bindings for this role assignment
	         *
	         */
	        get: function () {
	            return new RoleDefinitionBindings(this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Delete this role assignment
	     *
	     */
	    RoleAssignment.prototype.delete = function () {
	        return this.post({
	            headers: {
	                "X-HTTP-Method": "DELETE",
	            },
	        });
	    };
	    return RoleAssignment;
	}(queryable_1.QueryableInstance));
	exports.RoleAssignment = RoleAssignment;
	var RoleDefinitions = (function (_super) {
	    __extends(RoleDefinitions, _super);
	    /**
	     * Creates a new instance of the RoleDefinitions class
	     *
	     * @param baseUrl The url or Queryable which forms the parent of this fields collection
	     * @param path
	     *
	     */
	    function RoleDefinitions(baseUrl, path) {
	        if (path === void 0) { path = "roledefinitions"; }
	        _super.call(this, baseUrl, path);
	    }
	    /**
	     * Gets the role definition with the specified ID from the collection.
	     *
	     * @param id The ID of the role definition.
	     *
	     */
	    RoleDefinitions.prototype.getById = function (id) {
	        return new RoleDefinition(this, "getById(" + id + ")");
	    };
	    /**
	     * Gets the role definition with the specified name.
	     *
	     * @param name The name of the role definition.
	     *
	     */
	    RoleDefinitions.prototype.getByName = function (name) {
	        return new RoleDefinition(this, "getbyname('" + name + "')");
	    };
	    /**
	     * Gets the role definition with the specified type.
	     *
	     * @param name The name of the role definition.
	     *
	     */
	    RoleDefinitions.prototype.getByType = function (roleTypeKind) {
	        return new RoleDefinition(this, "getbytype(" + roleTypeKind + ")");
	    };
	    /**
	     * Create a role definition
	     *
	     * @param name The new role definition's name
	     * @param description The new role definition's description
	     * @param order The order in which the role definition appears
	     * @param basePermissions The permissions mask for this role definition
	     *
	     */
	    RoleDefinitions.prototype.add = function (name, description, order, basePermissions) {
	        var _this = this;
	        var postBody = JSON.stringify({
	            BasePermissions: util_1.Util.extend({ __metadata: { type: "SP.BasePermissions" } }, basePermissions),
	            Description: description,
	            Name: name,
	            Order: order,
	            __metadata: { "type": "SP.RoleDefinition" },
	        });
	        return this.post({ body: postBody }).then(function (data) {
	            return {
	                data: data,
	                definition: _this.getById(data.Id),
	            };
	        });
	    };
	    return RoleDefinitions;
	}(queryable_1.QueryableCollection));
	exports.RoleDefinitions = RoleDefinitions;
	var RoleDefinition = (function (_super) {
	    __extends(RoleDefinition, _super);
	    function RoleDefinition(baseUrl, path) {
	        _super.call(this, baseUrl, path);
	    }
	    /**
	     * Updates this web intance with the supplied properties
	     *
	     * @param properties A plain object hash of values to update for the web
	     */
	    /* tslint:disable no-string-literal */
	    RoleDefinition.prototype.update = function (properties) {
	        var _this = this;
	        if (typeof properties.hasOwnProperty("BasePermissions") !== "undefined") {
	            properties["BasePermissions"] = util_1.Util.extend({ __metadata: { type: "SP.BasePermissions" } }, properties["BasePermissions"]);
	        }
	        var postBody = JSON.stringify(util_1.Util.extend({
	            "__metadata": { "type": "SP.RoleDefinition" },
	        }, properties));
	        return this.post({
	            body: postBody,
	            headers: {
	                "X-HTTP-Method": "MERGE",
	            },
	        }).then(function (data) {
	            var retDef = _this;
	            if (properties.hasOwnProperty("Name")) {
	                var parent_1 = _this.getParent(RoleDefinitions, _this.parentUrl, "");
	                retDef = parent_1.getByName(properties["Name"]);
	            }
	            return {
	                data: data,
	                definition: retDef,
	            };
	        });
	    };
	    /* tslint:enable */
	    /**
	     * Delete this role definition
	     *
	     */
	    RoleDefinition.prototype.delete = function () {
	        return this.post({
	            headers: {
	                "X-HTTP-Method": "DELETE",
	            },
	        });
	    };
	    return RoleDefinition;
	}(queryable_1.QueryableInstance));
	exports.RoleDefinition = RoleDefinition;
	var RoleDefinitionBindings = (function (_super) {
	    __extends(RoleDefinitionBindings, _super);
	    function RoleDefinitionBindings(baseUrl, path) {
	        if (path === void 0) { path = "roledefinitionbindings"; }
	        _super.call(this, baseUrl, path);
	    }
	    return RoleDefinitionBindings;
	}(queryable_1.QueryableCollection));
	exports.RoleDefinitionBindings = RoleDefinitionBindings;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var queryable_1 = __webpack_require__(15);
	var siteusers_1 = __webpack_require__(30);
	var util_1 = __webpack_require__(5);
	/**
	 * Principal Type enum
	 *
	 */
	(function (PrincipalType) {
	    PrincipalType[PrincipalType["None"] = 0] = "None";
	    PrincipalType[PrincipalType["User"] = 1] = "User";
	    PrincipalType[PrincipalType["DistributionList"] = 2] = "DistributionList";
	    PrincipalType[PrincipalType["SecurityGroup"] = 4] = "SecurityGroup";
	    PrincipalType[PrincipalType["SharePointGroup"] = 8] = "SharePointGroup";
	    PrincipalType[PrincipalType["All"] = 15] = "All";
	})(exports.PrincipalType || (exports.PrincipalType = {}));
	var PrincipalType = exports.PrincipalType;
	/**
	 * Describes a collection of site users
	 *
	 */
	var SiteGroups = (function (_super) {
	    __extends(SiteGroups, _super);
	    /**
	     * Creates a new instance of the SiteUsers class
	     *
	     * @param baseUrl The url or Queryable which forms the parent of this user collection
	     */
	    function SiteGroups(baseUrl, path) {
	        if (path === void 0) { path = "sitegroups"; }
	        _super.call(this, baseUrl, path);
	    }
	    /**
	     * Adds a new group to the site collection
	     *
	     * @param props The properties to be updated
	     */
	    SiteGroups.prototype.add = function (properties) {
	        var _this = this;
	        var postBody = JSON.stringify(util_1.Util.extend({ "__metadata": { "type": "SP.Group" } }, properties));
	        return this.post({ body: postBody }).then(function (data) {
	            return {
	                data: data,
	                group: _this.getById(data.Id),
	            };
	        });
	    };
	    /**
	     * Gets a group from the collection by name
	     *
	     * @param email The name of the group
	     */
	    SiteGroups.prototype.getByName = function (groupName) {
	        return new SiteGroup(this, "getByName('" + groupName + "')");
	    };
	    /**
	     * Gets a group from the collection by id
	     *
	     * @param id The id of the group
	     */
	    SiteGroups.prototype.getById = function (id) {
	        var sg = new SiteGroup(this);
	        sg.concat("(" + id + ")");
	        return sg;
	    };
	    /**
	     * Removes the group with the specified member ID from the collection.
	     *
	     * @param id The id of the group to remove
	     */
	    SiteGroups.prototype.removeById = function (id) {
	        var g = new SiteGroups(this, "removeById('" + id + "')");
	        return g.post();
	    };
	    /**
	     * Removes a user from the collection by login name
	     *
	     * @param loginName The login name of the user
	     */
	    SiteGroups.prototype.removeByLoginName = function (loginName) {
	        var g = new SiteGroups(this, "removeByLoginName('" + loginName + "')");
	        return g.post();
	    };
	    return SiteGroups;
	}(queryable_1.QueryableCollection));
	exports.SiteGroups = SiteGroups;
	/**
	 * Describes a single group
	 *
	 */
	var SiteGroup = (function (_super) {
	    __extends(SiteGroup, _super);
	    /**
	     * Creates a new instance of the Group class
	     *
	     * @param baseUrl The url or Queryable which forms the parent of this site group
	     * @param path Optional, passes the path to the group
	     */
	    function SiteGroup(baseUrl, path) {
	        _super.call(this, baseUrl, path);
	    }
	    Object.defineProperty(SiteGroup.prototype, "users", {
	        /**
	         * Get's the users for this group
	         *
	         */
	        get: function () {
	            return new siteusers_1.SiteUsers(this, "users");
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	    * Updates this group instance with the supplied properties
	    *
	    * @param properties A GroupWriteableProperties object of property names and values to update for the user
	    */
	    /* tslint:disable no-string-literal */
	    SiteGroup.prototype.update = function (properties) {
	        var _this = this;
	        var postBody = util_1.Util.extend({ "__metadata": { "type": "SP.Group" } }, properties);
	        return this.post({
	            body: JSON.stringify(postBody),
	            headers: {
	                "X-HTTP-Method": "MERGE",
	            },
	        }).then(function (data) {
	            var retGroup = _this;
	            if (properties.hasOwnProperty("Title")) {
	                retGroup = _this.getParent(SiteGroup, _this.parentUrl, "getByName('" + properties["Title"] + "')");
	            }
	            return {
	                data: data,
	                group: retGroup,
	            };
	        });
	    };
	    return SiteGroup;
	}(queryable_1.QueryableInstance));
	exports.SiteGroup = SiteGroup;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var queryable_1 = __webpack_require__(15);
	var sitegroups_1 = __webpack_require__(29);
	var util_1 = __webpack_require__(5);
	/**
	 * Describes a collection of all site collection users
	 *
	 */
	var SiteUsers = (function (_super) {
	    __extends(SiteUsers, _super);
	    /**
	     * Creates a new instance of the Users class
	     *
	     * @param baseUrl The url or Queryable which forms the parent of this user collection
	     */
	    function SiteUsers(baseUrl, path) {
	        if (path === void 0) { path = "siteusers"; }
	        _super.call(this, baseUrl, path);
	    }
	    /**
	     * Gets a user from the collection by email
	     *
	     * @param email The email of the user
	     */
	    SiteUsers.prototype.getByEmail = function (email) {
	        return new SiteUser(this, "getByEmail('" + email + "')");
	    };
	    /**
	     * Gets a user from the collection by id
	     *
	     * @param id The id of the user
	     */
	    SiteUsers.prototype.getById = function (id) {
	        return new SiteUser(this, "getById(" + id + ")");
	    };
	    /**
	     * Gets a user from the collection by login name
	     *
	     * @param loginName The email address of the user
	     */
	    SiteUsers.prototype.getByLoginName = function (loginName) {
	        var su = new SiteUser(this);
	        su.concat("(@v)");
	        su.query.add("@v", encodeURIComponent(loginName));
	        return su;
	    };
	    /**
	     * Removes a user from the collection by id
	     *
	     * @param id The id of the user
	     */
	    SiteUsers.prototype.removeById = function (id) {
	        var o = new SiteUsers(this, "removeById(" + id + ")");
	        return o.post();
	    };
	    /**
	     * Removes a user from the collection by login name
	     *
	     * @param loginName The login name of the user
	     */
	    SiteUsers.prototype.removeByLoginName = function (loginName) {
	        var o = new SiteUsers(this, "removeByLoginName(@v)");
	        o.query.add("@v", encodeURIComponent(loginName));
	        return o.post();
	    };
	    /**
	     * Add a user to a group
	     *
	     * @param loginName The login name of the user to add to the group
	     *
	     */
	    SiteUsers.prototype.add = function (loginName) {
	        var _this = this;
	        var postBody = JSON.stringify({ "__metadata": { "type": "SP.User" }, LoginName: loginName });
	        return this.post({ body: postBody }).then(function (data) { return _this.getByLoginName(loginName); });
	    };
	    return SiteUsers;
	}(queryable_1.QueryableCollection));
	exports.SiteUsers = SiteUsers;
	/**
	 * Describes a single user
	 *
	 */
	var SiteUser = (function (_super) {
	    __extends(SiteUser, _super);
	    /**
	     * Creates a new instance of the User class
	     *
	     * @param baseUrl The url or Queryable which forms the parent of this fields collection
	     * @param path Optional, passes the path to the user
	     */
	    function SiteUser(baseUrl, path) {
	        _super.call(this, baseUrl, path);
	    }
	    Object.defineProperty(SiteUser.prototype, "groups", {
	        /**
	         * Get's the groups for this user.
	         *
	         */
	        get: function () {
	            return new sitegroups_1.SiteGroups(this, "groups");
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	    * Updates this user instance with the supplied properties
	    *
	    * @param properties A plain object of property names and values to update for the user
	    */
	    SiteUser.prototype.update = function (properties) {
	        var _this = this;
	        var postBody = util_1.Util.extend({ "__metadata": { "type": "SP.User" } }, properties);
	        return this.post({
	            body: JSON.stringify(postBody),
	            headers: {
	                "X-HTTP-Method": "MERGE",
	            },
	        }).then(function (data) {
	            return {
	                data: data,
	                user: _this,
	            };
	        });
	    };
	    /**
	     * Delete this user
	     *
	     */
	    SiteUser.prototype.delete = function () {
	        return this.post({
	            headers: {
	                "X-HTTP-Method": "DELETE",
	            },
	        });
	    };
	    return SiteUser;
	}(queryable_1.QueryableInstance));
	exports.SiteUser = SiteUser;


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var items_1 = __webpack_require__(32);
	var views_1 = __webpack_require__(36);
	var contenttypes_1 = __webpack_require__(35);
	var fields_1 = __webpack_require__(37);
	var forms_1 = __webpack_require__(39);
	var subscriptions_1 = __webpack_require__(40);
	var queryable_1 = __webpack_require__(15);
	var queryablesecurable_1 = __webpack_require__(27);
	var util_1 = __webpack_require__(5);
	var usercustomactions_1 = __webpack_require__(41);
	var odata_1 = __webpack_require__(19);
	/**
	 * Describes a collection of List objects
	 *
	 */
	var Lists = (function (_super) {
	    __extends(Lists, _super);
	    /**
	     * Creates a new instance of the Lists class
	     *
	     * @param baseUrl The url or Queryable which forms the parent of this fields collection
	     */
	    function Lists(baseUrl, path) {
	        if (path === void 0) { path = "lists"; }
	        _super.call(this, baseUrl, path);
	    }
	    /**
	     * Gets a list from the collection by title
	     *
	     * @param title The title of the list
	     */
	    Lists.prototype.getByTitle = function (title) {
	        return new List(this, "getByTitle('" + title + "')");
	    };
	    /**
	     * Gets a list from the collection by guid id
	     *
	     * @param title The Id of the list
	     */
	    Lists.prototype.getById = function (id) {
	        var list = new List(this);
	        list.concat("('" + id + "')");
	        return list;
	    };
	    /**
	     * Adds a new list to the collection
	     *
	     * @param title The new list's title
	     * @param description The new list's description
	     * @param template The list template value
	     * @param enableContentTypes If true content types will be allowed and enabled, otherwise they will be disallowed and not enabled
	     * @param additionalSettings Will be passed as part of the list creation body
	     */
	    /*tslint:disable max-line-length */
	    Lists.prototype.add = function (title, description, template, enableContentTypes, additionalSettings) {
	        var _this = this;
	        if (description === void 0) { description = ""; }
	        if (template === void 0) { template = 100; }
	        if (enableContentTypes === void 0) { enableContentTypes = false; }
	        if (additionalSettings === void 0) { additionalSettings = {}; }
	        var postBody = JSON.stringify(util_1.Util.extend({
	            "__metadata": { "type": "SP.List" },
	            "AllowContentTypes": enableContentTypes,
	            "BaseTemplate": template,
	            "ContentTypesEnabled": enableContentTypes,
	            "Description": description,
	            "Title": title,
	        }, additionalSettings));
	        return this.post({ body: postBody }).then(function (data) {
	            return { data: data, list: _this.getByTitle(title) };
	        });
	    };
	    /*tslint:enable */
	    /**
	     * Ensures that the specified list exists in the collection (note: settings are not updated if the list exists,
	     * not supported for batching)
	     *
	     * @param title The new list's title
	     * @param description The new list's description
	     * @param template The list template value
	     * @param enableContentTypes If true content types will be allowed and enabled, otherwise they will be disallowed and not enabled
	     * @param additionalSettings Will be passed as part of the list creation body
	     */
	    /*tslint:disable max-line-length */
	    Lists.prototype.ensure = function (title, description, template, enableContentTypes, additionalSettings) {
	        var _this = this;
	        if (description === void 0) { description = ""; }
	        if (template === void 0) { template = 100; }
	        if (enableContentTypes === void 0) { enableContentTypes = false; }
	        if (additionalSettings === void 0) { additionalSettings = {}; }
	        if (this.hasBatch) {
	            throw new Error("The ensure method is not supported as part of a batch.");
	        }
	        return new Promise(function (resolve, reject) {
	            var list = _this.getByTitle(title);
	            list.get().then(function (d) { return resolve({ created: false, data: d, list: list }); }).catch(function () {
	                _this.add(title, description, template, enableContentTypes, additionalSettings).then(function (r) {
	                    resolve({ created: true, data: r.data, list: _this.getByTitle(title) });
	                });
	            }).catch(function (e) { return reject(e); });
	        });
	    };
	    /*tslint:enable */
	    /**
	     * Gets a list that is the default asset location for images or other files, which the users upload to their wiki pages.
	     */
	    /*tslint:disable member-access */
	    Lists.prototype.ensureSiteAssetsLibrary = function () {
	        var q = new Lists(this, "ensuresiteassetslibrary");
	        return q.post().then(function (json) {
	            return new List(odata_1.extractOdataId(json));
	        });
	    };
	    /*tslint:enable */
	    /**
	     * Gets a list that is the default location for wiki pages.
	     */
	    /*tslint:disable member-access */
	    Lists.prototype.ensureSitePagesLibrary = function () {
	        var q = new Lists(this, "ensuresitepageslibrary");
	        return q.post().then(function (json) {
	            return new List(odata_1.extractOdataId(json));
	        });
	    };
	    return Lists;
	}(queryable_1.QueryableCollection));
	exports.Lists = Lists;
	/**
	 * Describes a single List instance
	 *
	 */
	var List = (function (_super) {
	    __extends(List, _super);
	    /**
	     * Creates a new instance of the Lists class
	     *
	     * @param baseUrl The url or Queryable which forms the parent of this fields collection
	     * @param path Optional, if supplied will be appended to the supplied baseUrl
	     */
	    function List(baseUrl, path) {
	        _super.call(this, baseUrl, path);
	    }
	    Object.defineProperty(List.prototype, "contentTypes", {
	        /**
	         * Gets the content types in this list
	         *
	         */
	        get: function () {
	            return new contenttypes_1.ContentTypes(this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(List.prototype, "items", {
	        /**
	         * Gets the items in this list
	         *
	         */
	        get: function () {
	            return new items_1.Items(this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(List.prototype, "views", {
	        /**
	         * Gets the views in this list
	         *
	         */
	        get: function () {
	            return new views_1.Views(this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(List.prototype, "fields", {
	        /**
	         * Gets the fields in this list
	         *
	         */
	        get: function () {
	            return new fields_1.Fields(this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(List.prototype, "forms", {
	        /**
	         * Gets the forms in this list
	         *
	         */
	        get: function () {
	            return new forms_1.Forms(this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(List.prototype, "defaultView", {
	        /**
	         * Gets the default view of this list
	         *
	         */
	        get: function () {
	            return new queryable_1.QueryableInstance(this, "DefaultView");
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(List.prototype, "userCustomActions", {
	        /**
	         * Get all custom actions on a site collection
	         *
	         */
	        get: function () {
	            return new usercustomactions_1.UserCustomActions(this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(List.prototype, "effectiveBasePermissions", {
	        /**
	         * Gets the effective base permissions of this list
	         *
	         */
	        get: function () {
	            return new queryable_1.Queryable(this, "EffectiveBasePermissions");
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(List.prototype, "eventReceivers", {
	        /**
	         * Gets the event receivers attached to this list
	         *
	         */
	        get: function () {
	            return new queryable_1.QueryableCollection(this, "EventReceivers");
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(List.prototype, "relatedFields", {
	        /**
	         * Gets the related fields of this list
	         *
	         */
	        get: function () {
	            return new queryable_1.Queryable(this, "getRelatedFields");
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(List.prototype, "informationRightsManagementSettings", {
	        /**
	         * Gets the IRM settings for this list
	         *
	         */
	        get: function () {
	            return new queryable_1.Queryable(this, "InformationRightsManagementSettings");
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(List.prototype, "subscriptions", {
	        /**
	         * Gets the webhook subscriptions of this list
	         *
	         */
	        get: function () {
	            return new subscriptions_1.Subscriptions(this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Gets a view by view guid id
	     *
	     */
	    List.prototype.getView = function (viewId) {
	        return new views_1.View(this, "getView('" + viewId + "')");
	    };
	    /**
	     * Updates this list intance with the supplied properties
	     *
	     * @param properties A plain object hash of values to update for the list
	     * @param eTag Value used in the IF-Match header, by default "*"
	     */
	    /* tslint:disable no-string-literal */
	    List.prototype.update = function (properties, eTag) {
	        var _this = this;
	        if (eTag === void 0) { eTag = "*"; }
	        var postBody = JSON.stringify(util_1.Util.extend({
	            "__metadata": { "type": "SP.List" },
	        }, properties));
	        return this.post({
	            body: postBody,
	            headers: {
	                "IF-Match": eTag,
	                "X-HTTP-Method": "MERGE",
	            },
	        }).then(function (data) {
	            var retList = _this;
	            if (properties.hasOwnProperty("Title")) {
	                retList = _this.getParent(List, _this.parentUrl, "getByTitle('" + properties["Title"] + "')");
	            }
	            return {
	                data: data,
	                list: retList,
	            };
	        });
	    };
	    /* tslint:enable */
	    /**
	     * Delete this list
	     *
	     * @param eTag Value used in the IF-Match header, by default "*"
	     */
	    List.prototype.delete = function (eTag) {
	        if (eTag === void 0) { eTag = "*"; }
	        return this.post({
	            headers: {
	                "IF-Match": eTag,
	                "X-HTTP-Method": "DELETE",
	            },
	        });
	    };
	    /**
	     * Returns the collection of changes from the change log that have occurred within the list, based on the specified query.
	     */
	    List.prototype.getChanges = function (query) {
	        var postBody = JSON.stringify({ "query": util_1.Util.extend({ "__metadata": { "type": "SP.ChangeQuery" } }, query) });
	        // don't change "this" instance of the List, make a new one
	        var q = new List(this, "getchanges");
	        return q.post({ body: postBody });
	    };
	    /**
	     * Returns a collection of items from the list based on the specified query.
	     *
	     * @param CamlQuery The Query schema of Collaborative Application Markup
	     * Language (CAML) is used in various ways within the context of Microsoft SharePoint Foundation
	     * to define queries against list data.
	     * see:
	     *
	     * https://msdn.microsoft.com/en-us/library/office/ms467521.aspx
	     *
	     * @param expands A URI with a $expand System Query Option indicates that Entries associated with
	     * the Entry or Collection of Entries identified by the Resource Path
	     * section of the URI must be represented inline (i.e. eagerly loaded).
	     * see:
	     *
	     * https://msdn.microsoft.com/en-us/library/office/fp142385.aspx
	     *
	     * http://www.odata.org/documentation/odata-version-2-0/uri-conventions/#ExpandSystemQueryOption
	     */
	    List.prototype.getItemsByCAMLQuery = function (query) {
	        var expands = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            expands[_i - 1] = arguments[_i];
	        }
	        var postBody = JSON.stringify({ "query": util_1.Util.extend({ "__metadata": { "type": "SP.CamlQuery" } }, query) });
	        // don't change "this" instance of the List, make a new one
	        var q = new List(this, "getitems");
	        q = q.expand.apply(q, expands);
	        return q.post({ body: postBody });
	    };
	    /**
	     * See: https://msdn.microsoft.com/en-us/library/office/dn292554.aspx
	     */
	    List.prototype.getListItemChangesSinceToken = function (query) {
	        var postBody = JSON.stringify({ "query": util_1.Util.extend({ "__metadata": { "type": "SP.ChangeLogItemQuery" } }, query) });
	        // don't change "this" instance of the List, make a new one
	        var q = new List(this, "getlistitemchangessincetoken");
	        // note we are using a custom parser to return text as the response is an xml doc
	        return q.post({ body: postBody }, { parse: function (r) { return r.text(); } });
	    };
	    /**
	     * Moves the list to the Recycle Bin and returns the identifier of the new Recycle Bin item.
	     */
	    List.prototype.recycle = function () {
	        this.append("recycle");
	        return this.post().then(function (data) {
	            if (data.hasOwnProperty("Recycle")) {
	                return data.Recycle;
	            }
	            else {
	                return data;
	            }
	        });
	    };
	    /**
	     * Renders list data based on the view xml provided
	     */
	    List.prototype.renderListData = function (viewXml) {
	        // don't change "this" instance of the List, make a new one
	        var q = new List(this, "renderlistdata(@viewXml)");
	        q.query.add("@viewXml", "'" + viewXml + "'");
	        return q.post().then(function (data) {
	            // data will be a string, so we parse it again
	            data = JSON.parse(data);
	            if (data.hasOwnProperty("RenderListData")) {
	                return data.RenderListData;
	            }
	            else {
	                return data;
	            }
	        });
	    };
	    /**
	     * Gets the field values and field schema attributes for a list item.
	     */
	    List.prototype.renderListFormData = function (itemId, formId, mode) {
	        // don't change "this" instance of the List, make a new one
	        var q = new List(this, "renderlistformdata(itemid=" + itemId + ", formid='" + formId + "', mode=" + mode + ")");
	        return q.post().then(function (data) {
	            // data will be a string, so we parse it again
	            data = JSON.parse(data);
	            if (data.hasOwnProperty("ListData")) {
	                return data.ListData;
	            }
	            else {
	                return data;
	            }
	        });
	    };
	    /**
	     * Reserves a list item ID for idempotent list item creation.
	     */
	    List.prototype.reserveListItemId = function () {
	        // don't change "this" instance of the List, make a new one
	        var q = new List(this, "reservelistitemid");
	        return q.post().then(function (data) {
	            if (data.hasOwnProperty("ReserveListItemId")) {
	                return data.ReserveListItemId;
	            }
	            else {
	                return data;
	            }
	        });
	    };
	    return List;
	}(queryablesecurable_1.QueryableSecurable));
	exports.List = List;


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var queryable_1 = __webpack_require__(15);
	var queryablesecurable_1 = __webpack_require__(27);
	var folders_1 = __webpack_require__(33);
	var contenttypes_1 = __webpack_require__(35);
	var util_1 = __webpack_require__(5);
	var odata_1 = __webpack_require__(19);
	/**
	 * Describes a collection of Item objects
	 *
	 */
	var Items = (function (_super) {
	    __extends(Items, _super);
	    /**
	     * Creates a new instance of the Items class
	     *
	     * @param baseUrl The url or Queryable which forms the parent of this fields collection
	     */
	    function Items(baseUrl, path) {
	        if (path === void 0) { path = "items"; }
	        _super.call(this, baseUrl, path);
	    }
	    /**
	     * Gets an Item by id
	     *
	     * @param id The integer id of the item to retrieve
	     */
	    Items.prototype.getById = function (id) {
	        var i = new Item(this);
	        i.concat("(" + id + ")");
	        return i;
	    };
	    /**
	     * Skips the specified number of items (https://msdn.microsoft.com/en-us/library/office/fp142385.aspx#sectionSection6)
	     *
	     * @param skip The starting id where the page should start, use with top to specify pages
	     */
	    Items.prototype.skip = function (skip) {
	        this._query.add("$skiptoken", encodeURIComponent("Paged=TRUE&p_ID=" + skip));
	        return this;
	    };
	    /**
	     * Gets a collection designed to aid in paging through data
	     *
	     */
	    Items.prototype.getPaged = function () {
	        return this.getAs(new PagedItemCollectionParser());
	    };
	    /**
	     * Adds a new item to the collection
	     *
	     * @param properties The new items's properties
	     */
	    Items.prototype.add = function (properties) {
	        var _this = this;
	        if (properties === void 0) { properties = {}; }
	        var removeDependency = this.addBatchDependency();
	        var parentList = this.getParent(queryable_1.QueryableInstance);
	        return parentList.select("ListItemEntityTypeFullName").getAs().then(function (d) {
	            var postBody = JSON.stringify(util_1.Util.extend({
	                "__metadata": { "type": d.ListItemEntityTypeFullName },
	            }, properties));
	            var promise = _this.postAs({ body: postBody }).then(function (data) {
	                return {
	                    data: data,
	                    item: _this.getById(data.Id),
	                };
	            });
	            removeDependency();
	            return promise;
	        });
	    };
	    return Items;
	}(queryable_1.QueryableCollection));
	exports.Items = Items;
	/**
	 * Descrines a single Item instance
	 *
	 */
	var Item = (function (_super) {
	    __extends(Item, _super);
	    /**
	     * Creates a new instance of the Items class
	     *
	     * @param baseUrl The url or Queryable which forms the parent of this fields collection
	     */
	    function Item(baseUrl, path) {
	        _super.call(this, baseUrl, path);
	    }
	    Object.defineProperty(Item.prototype, "attachmentFiles", {
	        /**
	         * Gets the set of attachments for this item
	         *
	         */
	        get: function () {
	            return new queryable_1.QueryableCollection(this, "AttachmentFiles");
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Item.prototype, "contentType", {
	        /**
	         * Gets the content type for this item
	         *
	         */
	        get: function () {
	            return new contenttypes_1.ContentType(this, "ContentType");
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Item.prototype, "effectiveBasePermissions", {
	        /**
	         * Gets the effective base permissions for the item
	         *
	         */
	        get: function () {
	            return new queryable_1.Queryable(this, "EffectiveBasePermissions");
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Item.prototype, "effectiveBasePermissionsForUI", {
	        /**
	         * Gets the effective base permissions for the item in a UI context
	         *
	         */
	        get: function () {
	            return new queryable_1.Queryable(this, "EffectiveBasePermissionsForUI");
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Item.prototype, "fieldValuesAsHTML", {
	        /**
	         * Gets the field values for this list item in their HTML representation
	         *
	         */
	        get: function () {
	            return new queryable_1.QueryableInstance(this, "FieldValuesAsHTML");
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Item.prototype, "fieldValuesAsText", {
	        /**
	         * Gets the field values for this list item in their text representation
	         *
	         */
	        get: function () {
	            return new queryable_1.QueryableInstance(this, "FieldValuesAsText");
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Item.prototype, "fieldValuesForEdit", {
	        /**
	         * Gets the field values for this list item for use in editing controls
	         *
	         */
	        get: function () {
	            return new queryable_1.QueryableInstance(this, "FieldValuesForEdit");
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Item.prototype, "folder", {
	        /**
	         * Gets the folder associated with this list item (if this item represents a folder)
	         *
	         */
	        get: function () {
	            return new folders_1.Folder(this, "Folder");
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Updates this list intance with the supplied properties
	     *
	     * @param properties A plain object hash of values to update for the list
	     * @param eTag Value used in the IF-Match header, by default "*"
	     */
	    Item.prototype.update = function (properties, eTag) {
	        var _this = this;
	        if (eTag === void 0) { eTag = "*"; }
	        var removeDependency = this.addBatchDependency();
	        var parentList = this.getParent(queryable_1.QueryableInstance, this.parentUrl.substr(0, this.parentUrl.lastIndexOf("/")));
	        return parentList.select("ListItemEntityTypeFullName").getAs().then(function (d) {
	            var postBody = JSON.stringify(util_1.Util.extend({
	                "__metadata": { "type": d.ListItemEntityTypeFullName },
	            }, properties));
	            var promise = _this.post({
	                body: postBody,
	                headers: {
	                    "IF-Match": eTag,
	                    "X-HTTP-Method": "MERGE",
	                },
	            }).then(function (data) {
	                return {
	                    data: data,
	                    item: _this,
	                };
	            });
	            removeDependency();
	            return promise;
	        });
	    };
	    /**
	     * Delete this item
	     *
	     * @param eTag Value used in the IF-Match header, by default "*"
	     */
	    Item.prototype.delete = function (eTag) {
	        if (eTag === void 0) { eTag = "*"; }
	        return this.post({
	            headers: {
	                "IF-Match": eTag,
	                "X-HTTP-Method": "DELETE",
	            },
	        });
	    };
	    /**
	     * Moves the list item to the Recycle Bin and returns the identifier of the new Recycle Bin item.
	     */
	    Item.prototype.recycle = function () {
	        var i = new Item(this, "recycle");
	        return i.post();
	    };
	    /**
	     * Gets a string representation of the full URL to the WOPI frame.
	     * If there is no associated WOPI application, or no associated action, an empty string is returned.
	     *
	     * @param action Display mode: 0: view, 1: edit, 2: mobileView, 3: interactivePreview
	     */
	    Item.prototype.getWopiFrameUrl = function (action) {
	        if (action === void 0) { action = 0; }
	        var i = new Item(this, "getWOPIFrameUrl(@action)");
	        i._query.add("@action", action);
	        return i.post().then(function (data) {
	            return data.GetWOPIFrameUrl;
	        });
	    };
	    /**
	     * Validates and sets the values of the specified collection of fields for the list item.
	     *
	     * @param formValues The fields to change and their new values.
	     * @param newDocumentUpdate true if the list item is a document being updated after upload; otherwise false.
	     */
	    /* tslint:disable max-line-length */
	    Item.prototype.validateUpdateListItem = function (formValues, newDocumentUpdate) {
	        if (newDocumentUpdate === void 0) { newDocumentUpdate = false; }
	        var postBody = JSON.stringify({ "formValues": formValues, bNewDocumentUpdate: newDocumentUpdate });
	        var item = new Item(this, "validateupdatelistitem");
	        return item.post({ body: postBody });
	    };
	    return Item;
	}(queryablesecurable_1.QueryableSecurable));
	exports.Item = Item;
	/**
	 * Provides paging functionality for list items
	 */
	var PagedItemCollection = (function () {
	    function PagedItemCollection(nextUrl, results) {
	        this.nextUrl = nextUrl;
	        this.results = results;
	    }
	    Object.defineProperty(PagedItemCollection.prototype, "hasNext", {
	        /**
	         * If true there are more results available in the set, otherwise there are not
	         */
	        get: function () {
	            return typeof this.nextUrl === "string" && this.nextUrl.length > 0;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Gets the next set of results, or resolves to null if no results are available
	     */
	    PagedItemCollection.prototype.getNext = function () {
	        if (this.hasNext) {
	            var items = new Items(this.nextUrl, null);
	            return items.getPaged();
	        }
	        return new Promise(function (r) { return r(null); });
	    };
	    return PagedItemCollection;
	}());
	exports.PagedItemCollection = PagedItemCollection;
	var PagedItemCollectionParser = (function (_super) {
	    __extends(PagedItemCollectionParser, _super);
	    function PagedItemCollectionParser() {
	        _super.apply(this, arguments);
	    }
	    PagedItemCollectionParser.prototype.parse = function (r) {
	        var _this = this;
	        return r.json().then(function (json) {
	            var nextUrl = json.hasOwnProperty("d") && json.d.hasOwnProperty("__next") ? json.d.__next : json["odata.nextLink"];
	            return new PagedItemCollection(nextUrl, _this.parseODataJSON(json));
	        });
	    };
	    return PagedItemCollectionParser;
	}(odata_1.ODataParserBase));


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var queryable_1 = __webpack_require__(15);
	var files_1 = __webpack_require__(34);
	var items_1 = __webpack_require__(32);
	/**
	 * Describes a collection of Folder objects
	 *
	 */
	var Folders = (function (_super) {
	    __extends(Folders, _super);
	    /**
	     * Creates a new instance of the Folders class
	     *
	     * @param baseUrl The url or Queryable which forms the parent of this fields collection
	     */
	    function Folders(baseUrl, path) {
	        if (path === void 0) { path = "folders"; }
	        _super.call(this, baseUrl, path);
	    }
	    /**
	     * Gets a folder by folder name
	     *
	     */
	    Folders.prototype.getByName = function (name) {
	        var f = new Folder(this);
	        f.concat("('" + name + "')");
	        return f;
	    };
	    /**
	     * Adds a new folder to the current folder (relative) or any folder (absolute)
	     *
	     * @param url The relative or absolute url where the new folder will be created. Urls starting with a forward slash are absolute.
	     * @returns The new Folder and the raw response.
	     */
	    Folders.prototype.add = function (url) {
	        var _this = this;
	        return new Folders(this, "add('" + url + "')").post().then(function (response) {
	            return {
	                data: response,
	                folder: _this.getByName(url),
	            };
	        });
	    };
	    return Folders;
	}(queryable_1.QueryableCollection));
	exports.Folders = Folders;
	/**
	 * Describes a single Folder instance
	 *
	 */
	var Folder = (function (_super) {
	    __extends(Folder, _super);
	    //
	    // TODO:
	    //      Properties (https://msdn.microsoft.com/en-us/library/office/dn450841.aspx#bk_FolderProperties)
	    //          UniqueContentTypeOrder (setter)
	    //          WelcomePage (setter)
	    //
	    /**
	     * Creates a new instance of the Folder class
	     *
	     * @param baseUrl The url or Queryable which forms the parent of this fields collection
	     * @param path Optional, if supplied will be appended to the supplied baseUrl
	     */
	    function Folder(baseUrl, path) {
	        _super.call(this, baseUrl, path);
	    }
	    Object.defineProperty(Folder.prototype, "contentTypeOrder", {
	        /**
	         * Specifies the sequence in which content types are displayed.
	         *
	         */
	        get: function () {
	            return new queryable_1.QueryableCollection(this, "contentTypeOrder");
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Folder.prototype, "files", {
	        /**
	         * Gets this folder's files
	         *
	         */
	        get: function () {
	            return new files_1.Files(this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Folder.prototype, "folders", {
	        /**
	         * Gets this folder's sub folders
	         *
	         */
	        get: function () {
	            return new Folders(this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Folder.prototype, "listItemAllFields", {
	        /**
	         * Gets this folder's list item
	         *
	         */
	        get: function () {
	            return new items_1.Item(this, "listItemAllFields");
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Folder.prototype, "parentFolder", {
	        /**
	         * Gets the parent folder, if available
	         *
	         */
	        get: function () {
	            return new Folder(this, "parentFolder");
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Folder.prototype, "properties", {
	        /**
	         * Gets this folder's properties
	         *
	         */
	        get: function () {
	            return new queryable_1.QueryableInstance(this, "properties");
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Folder.prototype, "serverRelativeUrl", {
	        /**
	         * Gets this folder's server relative url
	         *
	         */
	        get: function () {
	            return new queryable_1.Queryable(this, "serverRelativeUrl");
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Folder.prototype, "uniqueContentTypeOrder", {
	        /**
	         * Gets a value that specifies the content type order.
	         *
	         */
	        get: function () {
	            return new queryable_1.QueryableCollection(this, "uniqueContentTypeOrder");
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	    * Delete this folder
	    *
	    * @param eTag Value used in the IF-Match header, by default "*"
	    */
	    Folder.prototype.delete = function (eTag) {
	        if (eTag === void 0) { eTag = "*"; }
	        return new Folder(this).post({
	            headers: {
	                "IF-Match": eTag,
	                "X-HTTP-Method": "DELETE",
	            },
	        });
	    };
	    /**
	     * Moves the folder to the Recycle Bin and returns the identifier of the new Recycle Bin item.
	     */
	    Folder.prototype.recycle = function () {
	        return new Folder(this, "recycle").post();
	    };
	    return Folder;
	}(queryable_1.QueryableInstance));
	exports.Folder = Folder;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var queryable_1 = __webpack_require__(15);
	var items_1 = __webpack_require__(32);
	var util_1 = __webpack_require__(5);
	/**
	 * Describes a collection of File objects
	 *
	 */
	var Files = (function (_super) {
	    __extends(Files, _super);
	    /**
	     * Creates a new instance of the Files class
	     *
	     * @param baseUrl The url or Queryable which forms the parent of this fields collection
	     */
	    function Files(baseUrl, path) {
	        if (path === void 0) { path = "files"; }
	        _super.call(this, baseUrl, path);
	    }
	    /**
	     * Gets a File by filename
	     *
	     * @param name The name of the file, including extension.
	     */
	    Files.prototype.getByName = function (name) {
	        var f = new File(this);
	        f.concat("('" + name + "')");
	        return f;
	    };
	    /**
	     * Uploads a file.
	     *
	     * @param url The folder-relative url of the file.
	     * @param content The file contents blob.
	     * @param shouldOverWrite Should a file with the same name in the same location be overwritten? (default: true)
	     * @returns The new File and the raw response.
	     */
	    Files.prototype.add = function (url, content, shouldOverWrite) {
	        var _this = this;
	        if (shouldOverWrite === void 0) { shouldOverWrite = true; }
	        return new Files(this, "add(overwrite=" + shouldOverWrite + ",url='" + url + "')")
	            .post({
	            body: content,
	        }).then(function (response) {
	            return {
	                data: response,
	                file: _this.getByName(url),
	            };
	        });
	    };
	    /**
	     * Uploads a file.
	     *
	     * @param url The folder-relative url of the file.
	     * @param content The Blob file content to add
	     * @param progress A callback function which can be used to track the progress of the upload
	     * @param shouldOverWrite Should a file with the same name in the same location be overwritten? (default: true)
	     * @param chunkSize The size of each file slice, in bytes (default: 10485760)
	     * @returns The new File and the raw response.
	     */
	    Files.prototype.addChunked = function (url, content, progress, shouldOverWrite, chunkSize) {
	        var _this = this;
	        if (shouldOverWrite === void 0) { shouldOverWrite = true; }
	        if (chunkSize === void 0) { chunkSize = 10485760; }
	        var adder = new Files(this, "add(overwrite=" + shouldOverWrite + ",url='" + url + "')");
	        return adder.post().then(function () { return _this.getByName(url); }).then(function (file) { return file.setContentChunked(content, progress, chunkSize); }).then(function (response) {
	            return {
	                data: response,
	                file: _this.getByName(url),
	            };
	        });
	    };
	    /**
	     * Adds a ghosted file to an existing list or document library.
	     *
	     * @param fileUrl The server-relative url where you want to save the file.
	     * @param templateFileType The type of use to create the file.
	     * @returns The template file that was added and the raw response.
	     */
	    Files.prototype.addTemplateFile = function (fileUrl, templateFileType) {
	        var _this = this;
	        return new Files(this, "addTemplateFile(urloffile='" + fileUrl + "',templatefiletype=" + templateFileType + ")")
	            .post().then(function (response) {
	            return {
	                data: response,
	                file: _this.getByName(fileUrl),
	            };
	        });
	    };
	    return Files;
	}(queryable_1.QueryableCollection));
	exports.Files = Files;
	/**
	 * Describes a single File instance
	 *
	 */
	var File = (function (_super) {
	    __extends(File, _super);
	    /**
	     * Creates a new instance of the File class
	     *
	     * @param baseUrl The url or Queryable which forms the parent of this fields collection
	     * @param path Optional, if supplied will be appended to the supplied baseUrl
	     */
	    function File(baseUrl, path) {
	        _super.call(this, baseUrl, path);
	    }
	    Object.defineProperty(File.prototype, "listItemAllFields", {
	        /**
	         * Gets a value that specifies the list item field values for the list item corresponding to the file.
	         *
	         */
	        get: function () {
	            return new items_1.Item(this, "listItemAllFields");
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(File.prototype, "versions", {
	        /**
	         * Gets a collection of versions
	         *
	         */
	        get: function () {
	            return new Versions(this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Approves the file submitted for content approval with the specified comment.
	     * Only documents in lists that are enabled for content approval can be approved.
	     *
	     * @param comment The comment for the approval.
	     */
	    File.prototype.approve = function (comment) {
	        return new File(this, "approve(comment='" + comment + "')").post();
	    };
	    /**
	     * Stops the chunk upload session without saving the uploaded data.
	     * If the file doesn’t already exist in the library, the partially uploaded file will be deleted.
	     * Use this in response to user action (as in a request to cancel an upload) or an error or exception.
	     * Use the uploadId value that was passed to the StartUpload method that started the upload session.
	     * This method is currently available only on Office 365.
	     *
	     * @param uploadId The unique identifier of the upload session.
	     */
	    File.prototype.cancelUpload = function (uploadId) {
	        return new File(this, "cancelUpload(uploadId=guid'" + uploadId + "')").post();
	    };
	    /**
	     * Checks the file in to a document library based on the check-in type.
	     *
	     * @param comment A comment for the check-in. Its length must be <= 1023.
	     * @param checkinType The check-in type for the file.
	     */
	    File.prototype.checkin = function (comment, checkinType) {
	        if (comment === void 0) { comment = ""; }
	        if (checkinType === void 0) { checkinType = CheckinType.Major; }
	        // TODO: Enforce comment length <= 1023
	        return new File(this, "checkin(comment='" + comment + "',checkintype=" + checkinType + ")").post();
	    };
	    /**
	     * Checks out the file from a document library.
	     */
	    File.prototype.checkout = function () {
	        return new File(this, "checkout").post();
	    };
	    /**
	     * Copies the file to the destination url.
	     *
	     * @param url The absolute url or server relative url of the destination file path to copy to.
	     * @param shouldOverWrite Should a file with the same name in the same location be overwritten?
	     */
	    File.prototype.copyTo = function (url, shouldOverWrite) {
	        if (shouldOverWrite === void 0) { shouldOverWrite = true; }
	        return new File(this, "copyTo(strnewurl='" + url + "',boverwrite=" + shouldOverWrite + ")").post();
	    };
	    /**
	     * Delete this file.
	     *
	     * @param eTag Value used in the IF-Match header, by default "*"
	     */
	    File.prototype.delete = function (eTag) {
	        if (eTag === void 0) { eTag = "*"; }
	        return new File(this).post({
	            headers: {
	                "IF-Match": eTag,
	                "X-HTTP-Method": "DELETE",
	            },
	        });
	    };
	    /**
	     * Denies approval for a file that was submitted for content approval.
	     * Only documents in lists that are enabled for content approval can be denied.
	     *
	     * @param comment The comment for the denial.
	     */
	    File.prototype.deny = function (comment) {
	        if (comment === void 0) { comment = ""; }
	        return new File(this, "deny(comment='" + comment + "')").post();
	    };
	    /**
	     * Specifies the control set used to access, modify, or add Web Parts associated with this Web Part Page and view.
	     * An exception is thrown if the file is not an ASPX page.
	     *
	     * @param scope The WebPartsPersonalizationScope view on the Web Parts page.
	     */
	    File.prototype.getLimitedWebPartManager = function (scope) {
	        if (scope === void 0) { scope = WebPartsPersonalizationScope.User; }
	        return new queryable_1.Queryable(this, "getLimitedWebPartManager(scope=" + scope + ")");
	    };
	    /**
	     * Moves the file to the specified destination url.
	     *
	     * @param url The absolute url or server relative url of the destination file path to move to.
	     * @param moveOperations The bitwise MoveOperations value for how to move the file.
	     */
	    File.prototype.moveTo = function (url, moveOperations) {
	        if (moveOperations === void 0) { moveOperations = MoveOperations.Overwrite; }
	        return new File(this, "moveTo(newurl='" + url + "',flags=" + moveOperations + ")").post();
	    };
	    /**
	     * Submits the file for content approval with the specified comment.
	     *
	     * @param comment The comment for the published file. Its length must be <= 1023.
	     */
	    File.prototype.publish = function (comment) {
	        if (comment === void 0) { comment = ""; }
	        return new File(this, "publish(comment='" + comment + "')").post();
	    };
	    /**
	     * Moves the file to the Recycle Bin and returns the identifier of the new Recycle Bin item.
	     *
	     * @returns The GUID of the recycled file.
	     */
	    File.prototype.recycle = function () {
	        return new File(this, "recycle").post();
	    };
	    /**
	     * Reverts an existing checkout for the file.
	     *
	     */
	    File.prototype.undoCheckout = function () {
	        return new File(this, "undoCheckout").post();
	    };
	    /**
	     * Removes the file from content approval or unpublish a major version.
	     *
	     * @param comment The comment for the unpublish operation. Its length must be <= 1023.
	     */
	    File.prototype.unpublish = function (comment) {
	        if (comment === void 0) { comment = ""; }
	        if (comment.length > 1023) {
	            throw new Error("The maximum comment length is 1023 characters.");
	        }
	        return new File(this, "unpublish(comment='" + comment + "')").post();
	    };
	    /**
	     * Gets the contents of the file as text
	     *
	     */
	    File.prototype.getText = function () {
	        return new File(this, "$value").get(new TextFileParser(), { headers: { "binaryStringResponseBody": "true" } });
	    };
	    /**
	     * Gets the contents of the file as a blob, does not work in Node.js
	     *
	     */
	    File.prototype.getBlob = function () {
	        return new File(this, "$value").get(new BlobFileParser(), { headers: { "binaryStringResponseBody": "true" } });
	    };
	    /**
	     * Gets the contents of a file as an ArrayBuffer, works in Node.js
	     */
	    File.prototype.getBuffer = function () {
	        return new File(this, "$value").get(new BufferFileParser(), { headers: { "binaryStringResponseBody": "true" } });
	    };
	    /**
	     * Sets the content of a file, for large files use setContentChunked
	     *
	     * @param content The file content
	     *
	     */
	    File.prototype.setContent = function (content) {
	        var _this = this;
	        var setter = new File(this, "$value");
	        return setter.post({
	            body: content,
	            headers: {
	                "X-HTTP-Method": "PUT",
	            },
	        }).then(function (_) { return new File(_this); });
	    };
	    /**
	     * Sets the contents of a file using a chunked upload approach
	     *
	     * @param file The file to upload
	     * @param progress A callback function which can be used to track the progress of the upload
	     * @param chunkSize The size of each file slice, in bytes (default: 10485760)
	     */
	    File.prototype.setContentChunked = function (file, progress, chunkSize) {
	        if (chunkSize === void 0) { chunkSize = 10485760; }
	        if (typeof progress === "undefined") {
	            progress = function (data) { return null; };
	        }
	        var self = this;
	        var fileSize = file.size;
	        var blockCount = parseInt((file.size / chunkSize).toString(), 10) + ((file.size % chunkSize === 0) ? 1 : 0);
	        console.log("blockCount: " + blockCount);
	        var uploadId = util_1.Util.getGUID();
	        // start the chain with the first fragment
	        progress({ blockNumber: 1, chunkSize: chunkSize, currentPointer: 0, fileSize: fileSize, stage: "starting", totalBlocks: blockCount });
	        var chain = self.startUpload(uploadId, file.slice(0, chunkSize));
	        // skip the first and last blocks
	        var _loop_1 = function(i) {
	            chain = chain.then(function (pointer) {
	                progress({ blockNumber: i, chunkSize: chunkSize, currentPointer: pointer, fileSize: fileSize, stage: "continue", totalBlocks: blockCount });
	                return self.continueUpload(uploadId, pointer, file.slice(pointer, pointer + chunkSize));
	            });
	        };
	        for (var i = 2; i < blockCount; i++) {
	            _loop_1(i);
	        }
	        return chain.then(function (pointer) {
	            progress({ blockNumber: blockCount, chunkSize: chunkSize, currentPointer: pointer, fileSize: fileSize, stage: "finishing", totalBlocks: blockCount });
	            return self.finishUpload(uploadId, pointer, file.slice(pointer));
	        }).then(function (_) {
	            return self;
	        });
	    };
	    /**
	     * Starts a new chunk upload session and uploads the first fragment.
	     * The current file content is not changed when this method completes.
	     * The method is idempotent (and therefore does not change the result) as long as you use the same values for uploadId and stream.
	     * The upload session ends either when you use the CancelUpload method or when you successfully
	     * complete the upload session by passing the rest of the file contents through the ContinueUpload and FinishUpload methods.
	     * The StartUpload and ContinueUpload methods return the size of the running total of uploaded data in bytes,
	     * so you can pass those return values to subsequent uses of ContinueUpload and FinishUpload.
	     * This method is currently available only on Office 365.
	     *
	     * @param uploadId The unique identifier of the upload session.
	     * @param fragment The file contents.
	     * @returns The size of the total uploaded data in bytes.
	     */
	    File.prototype.startUpload = function (uploadId, fragment) {
	        return new File(this, "startUpload(uploadId=guid'" + uploadId + "')").postAs({ body: fragment }).then(function (n) { return parseFloat(n); });
	    };
	    /**
	     * Continues the chunk upload session with an additional fragment.
	     * The current file content is not changed.
	     * Use the uploadId value that was passed to the StartUpload method that started the upload session.
	     * This method is currently available only on Office 365.
	     *
	     * @param uploadId The unique identifier of the upload session.
	     * @param fileOffset The size of the offset into the file where the fragment starts.
	     * @param fragment The file contents.
	     * @returns The size of the total uploaded data in bytes.
	     */
	    File.prototype.continueUpload = function (uploadId, fileOffset, fragment) {
	        return new File(this, "continueUpload(uploadId=guid'" + uploadId + "',fileOffset=" + fileOffset + ")").postAs({ body: fragment }).then(function (n) { return parseFloat(n); });
	    };
	    /**
	     * Uploads the last file fragment and commits the file. The current file content is changed when this method completes.
	     * Use the uploadId value that was passed to the StartUpload method that started the upload session.
	     * This method is currently available only on Office 365.
	     *
	     * @param uploadId The unique identifier of the upload session.
	     * @param fileOffset The size of the offset into the file where the fragment starts.
	     * @param fragment The file contents.
	     * @returns The newly uploaded file.
	     */
	    File.prototype.finishUpload = function (uploadId, fileOffset, fragment) {
	        return new File(this, "finishUpload(uploadId=guid'" + uploadId + "',fileOffset=" + fileOffset + ")")
	            .postAs({ body: fragment }).then(function (response) {
	            return {
	                data: response,
	                file: new File(response.ServerRelativeUrl),
	            };
	        });
	    };
	    return File;
	}(queryable_1.QueryableInstance));
	exports.File = File;
	var TextFileParser = (function () {
	    function TextFileParser() {
	    }
	    TextFileParser.prototype.parse = function (r) {
	        return r.text();
	    };
	    return TextFileParser;
	}());
	exports.TextFileParser = TextFileParser;
	var BlobFileParser = (function () {
	    function BlobFileParser() {
	    }
	    BlobFileParser.prototype.parse = function (r) {
	        return r.blob();
	    };
	    return BlobFileParser;
	}());
	exports.BlobFileParser = BlobFileParser;
	var BufferFileParser = (function () {
	    function BufferFileParser() {
	    }
	    BufferFileParser.prototype.parse = function (r) {
	        if (util_1.Util.isFunction(r.arrayBuffer)) {
	            return r.arrayBuffer();
	        }
	        return r.buffer();
	    };
	    return BufferFileParser;
	}());
	exports.BufferFileParser = BufferFileParser;
	/**
	 * Describes a collection of Version objects
	 *
	 */
	var Versions = (function (_super) {
	    __extends(Versions, _super);
	    /**
	     * Creates a new instance of the File class
	     *
	     * @param baseUrl The url or Queryable which forms the parent of this fields collection
	     */
	    function Versions(baseUrl, path) {
	        if (path === void 0) { path = "versions"; }
	        _super.call(this, baseUrl, path);
	    }
	    /**
	     * Gets a version by id
	     *
	     * @param versionId The id of the version to retrieve
	     */
	    Versions.prototype.getById = function (versionId) {
	        var v = new Version(this);
	        v.concat("(" + versionId + ")");
	        return v;
	    };
	    /**
	     * Deletes all the file version objects in the collection.
	     *
	     */
	    Versions.prototype.deleteAll = function () {
	        return new Versions(this, "deleteAll").post();
	    };
	    /**
	     * Deletes the specified version of the file.
	     *
	     * @param versionId The ID of the file version to delete.
	     */
	    Versions.prototype.deleteById = function (versionId) {
	        return new Versions(this, "deleteById(vid=" + versionId + ")").post();
	    };
	    /**
	     * Deletes the file version object with the specified version label.
	     *
	     * @param label The version label of the file version to delete, for example: 1.2
	     */
	    Versions.prototype.deleteByLabel = function (label) {
	        return new Versions(this, "deleteByLabel(versionlabel='" + label + "')").post();
	    };
	    /**
	     * Creates a new file version from the file specified by the version label.
	     *
	     * @param label The version label of the file version to restore, for example: 1.2
	     */
	    Versions.prototype.restoreByLabel = function (label) {
	        return new Versions(this, "restoreByLabel(versionlabel='" + label + "')").post();
	    };
	    return Versions;
	}(queryable_1.QueryableCollection));
	exports.Versions = Versions;
	/**
	 * Describes a single Version instance
	 *
	 */
	var Version = (function (_super) {
	    __extends(Version, _super);
	    /**
	     * Creates a new instance of the Version class
	     *
	     * @param baseUrl The url or Queryable which forms the parent of this fields collection
	     * @param path Optional, if supplied will be appended to the supplied baseUrl
	     */
	    function Version(baseUrl, path) {
	        _super.call(this, baseUrl, path);
	    }
	    /**
	    * Delete a specific version of a file.
	    *
	    * @param eTag Value used in the IF-Match header, by default "*"
	    */
	    Version.prototype.delete = function (eTag) {
	        if (eTag === void 0) { eTag = "*"; }
	        return this.post({
	            headers: {
	                "IF-Match": eTag,
	                "X-HTTP-Method": "DELETE",
	            },
	        });
	    };
	    return Version;
	}(queryable_1.QueryableInstance));
	exports.Version = Version;
	(function (CheckinType) {
	    CheckinType[CheckinType["Minor"] = 0] = "Minor";
	    CheckinType[CheckinType["Major"] = 1] = "Major";
	    CheckinType[CheckinType["Overwrite"] = 2] = "Overwrite";
	})(exports.CheckinType || (exports.CheckinType = {}));
	var CheckinType = exports.CheckinType;
	(function (WebPartsPersonalizationScope) {
	    WebPartsPersonalizationScope[WebPartsPersonalizationScope["User"] = 0] = "User";
	    WebPartsPersonalizationScope[WebPartsPersonalizationScope["Shared"] = 1] = "Shared";
	})(exports.WebPartsPersonalizationScope || (exports.WebPartsPersonalizationScope = {}));
	var WebPartsPersonalizationScope = exports.WebPartsPersonalizationScope;
	(function (MoveOperations) {
	    MoveOperations[MoveOperations["Overwrite"] = 1] = "Overwrite";
	    MoveOperations[MoveOperations["AllowBrokenThickets"] = 8] = "AllowBrokenThickets";
	})(exports.MoveOperations || (exports.MoveOperations = {}));
	var MoveOperations = exports.MoveOperations;
	(function (TemplateFileType) {
	    TemplateFileType[TemplateFileType["StandardPage"] = 0] = "StandardPage";
	    TemplateFileType[TemplateFileType["WikiPage"] = 1] = "WikiPage";
	    TemplateFileType[TemplateFileType["FormPage"] = 2] = "FormPage";
	})(exports.TemplateFileType || (exports.TemplateFileType = {}));
	var TemplateFileType = exports.TemplateFileType;


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var util_1 = __webpack_require__(5);
	var queryable_1 = __webpack_require__(15);
	/**
	 * Describes a collection of content types
	 *
	 */
	var ContentTypes = (function (_super) {
	    __extends(ContentTypes, _super);
	    /**
	     * Creates a new instance of the ContentTypes class
	     *
	     * @param baseUrl The url or Queryable which forms the parent of this content types collection
	     */
	    function ContentTypes(baseUrl, path) {
	        if (path === void 0) { path = "contenttypes"; }
	        _super.call(this, baseUrl, path);
	    }
	    /**
	     * Gets a ContentType by content type id
	     */
	    ContentTypes.prototype.getById = function (id) {
	        var ct = new ContentType(this);
	        ct.concat("('" + id + "')");
	        return ct;
	    };
	    /**
	     * Adds an existing contenttype to a content type collection
	     *
	     * @param contentTypeId in the following format, for example: 0x010102
	     */
	    ContentTypes.prototype.addAvailableContentType = function (contentTypeId) {
	        var _this = this;
	        var postBody = JSON.stringify({
	            "contentTypeId": contentTypeId,
	        });
	        return new ContentTypes(this, "addAvailableContentType").postAs({ body: postBody }).then(function (data) {
	            return {
	                contentType: _this.getById(data.id),
	                data: data,
	            };
	        });
	    };
	    /**
	     * Adds a new content type to the collection
	     *
	     * @param id The desired content type id for the new content type (also determines the parent content type)
	     * @param name The name of the content type
	     * @param description The description of the content type
	     * @param group The group in which to add the content type
	     * @param additionalSettings Any additional settings to provide when creating the content type
	     *
	     */
	    ContentTypes.prototype.add = function (id, name, description, group, additionalSettings) {
	        var _this = this;
	        if (description === void 0) { description = ""; }
	        if (group === void 0) { group = "Custom Content Types"; }
	        if (additionalSettings === void 0) { additionalSettings = {}; }
	        var postBody = JSON.stringify(util_1.Util.extend({
	            "__metadata": { "type": "SP.ContentType" },
	            "Id": { "StringValue": id },
	            "Name": name,
	            "Group": group,
	            "Description": description,
	        }, additionalSettings));
	        return this.post({ body: postBody }).then(function (data) {
	            return { contentType: _this.getById(data.id), data: data };
	        });
	    };
	    return ContentTypes;
	}(queryable_1.QueryableCollection));
	exports.ContentTypes = ContentTypes;
	/**
	 * Describes a single ContentType instance
	 *
	 */
	var ContentType = (function (_super) {
	    __extends(ContentType, _super);
	    /**
	     * Creates a new instance of the ContentType class
	     *
	     * @param baseUrl The url or Queryable which forms the parent of this content type instance
	     */
	    function ContentType(baseUrl, path) {
	        _super.call(this, baseUrl, path);
	    }
	    Object.defineProperty(ContentType.prototype, "fieldLinks", {
	        /**
	         * Gets the column (also known as field) references in the content type.
	        */
	        get: function () {
	            return new queryable_1.Queryable(this, "fieldLinks");
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ContentType.prototype, "fields", {
	        /**
	         * Gets a value that specifies the collection of fields for the content type.
	         */
	        get: function () {
	            return new queryable_1.Queryable(this, "fields");
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ContentType.prototype, "parent", {
	        /**
	         * Gets the parent content type of the content type.
	         */
	        get: function () {
	            return new ContentType(this, "parent");
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ContentType.prototype, "workflowAssociations", {
	        /**
	         * Gets a value that specifies the collection of workflow associations for the content type.
	         */
	        get: function () {
	            return new queryable_1.Queryable(this, "workflowAssociations");
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return ContentType;
	}(queryable_1.QueryableInstance));
	exports.ContentType = ContentType;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var queryable_1 = __webpack_require__(15);
	var util_1 = __webpack_require__(5);
	/**
	 * Describes the views available in the current context
	 *
	 */
	var Views = (function (_super) {
	    __extends(Views, _super);
	    /**
	     * Creates a new instance of the Views class
	     *
	     * @param baseUrl The url or Queryable which forms the parent of this fields collection
	     */
	    function Views(baseUrl) {
	        _super.call(this, baseUrl, "views");
	    }
	    /**
	     * Gets a view by guid id
	     *
	     * @param id The GUID id of the view
	     */
	    Views.prototype.getById = function (id) {
	        var v = new View(this);
	        v.concat("('" + id + "')");
	        return v;
	    };
	    /**
	     * Gets a view by title (case-sensitive)
	     *
	     * @param title The case-sensitive title of the view
	     */
	    Views.prototype.getByTitle = function (title) {
	        return new View(this, "getByTitle('" + title + "')");
	    };
	    /**
	     * Adds a new view to the collection
	     *
	     * @param title The new views's title
	     * @param personalView True if this is a personal view, otherwise false, default = false
	     * @param additionalSettings Will be passed as part of the view creation body
	     */
	    /*tslint:disable max-line-length */
	    Views.prototype.add = function (title, personalView, additionalSettings) {
	        var _this = this;
	        if (personalView === void 0) { personalView = false; }
	        if (additionalSettings === void 0) { additionalSettings = {}; }
	        var postBody = JSON.stringify(util_1.Util.extend({
	            "__metadata": { "type": "SP.View" },
	            "Title": title,
	            "PersonalView": personalView,
	        }, additionalSettings));
	        return this.postAs({ body: postBody }).then(function (data) {
	            return {
	                data: data,
	                view: _this.getById(data.Id),
	            };
	        });
	    };
	    return Views;
	}(queryable_1.QueryableCollection));
	exports.Views = Views;
	/**
	 * Describes a single View instance
	 *
	 */
	var View = (function (_super) {
	    __extends(View, _super);
	    /**
	     * Creates a new instance of the View class
	     *
	     * @param baseUrl The url or Queryable which forms the parent of this fields collection
	     */
	    function View(baseUrl, path) {
	        _super.call(this, baseUrl, path);
	    }
	    Object.defineProperty(View.prototype, "fields", {
	        get: function () {
	            return new ViewFields(this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Updates this view intance with the supplied properties
	     *
	     * @param properties A plain object hash of values to update for the view
	     */
	    View.prototype.update = function (properties) {
	        var _this = this;
	        var postBody = JSON.stringify(util_1.Util.extend({
	            "__metadata": { "type": "SP.View" },
	        }, properties));
	        return this.post({
	            body: postBody,
	            headers: {
	                "X-HTTP-Method": "MERGE",
	            },
	        }).then(function (data) {
	            return {
	                data: data,
	                view: _this,
	            };
	        });
	    };
	    /**
	     * Delete this view
	     *
	     */
	    View.prototype.delete = function () {
	        return this.post({
	            headers: {
	                "X-HTTP-Method": "DELETE",
	            },
	        });
	    };
	    /**
	     * Returns the list view as HTML.
	     *
	     */
	    View.prototype.renderAsHtml = function () {
	        var q = new queryable_1.Queryable(this, "renderashtml");
	        return q.get();
	    };
	    return View;
	}(queryable_1.QueryableInstance));
	exports.View = View;
	var ViewFields = (function (_super) {
	    __extends(ViewFields, _super);
	    function ViewFields(baseUrl, path) {
	        if (path === void 0) { path = "viewfields"; }
	        _super.call(this, baseUrl, path);
	    }
	    /**
	     * Gets a value that specifies the XML schema that represents the collection.
	     */
	    ViewFields.prototype.getSchemaXml = function () {
	        var q = new queryable_1.Queryable(this, "schemaxml");
	        return q.get();
	    };
	    /**
	     * Adds the field with the specified field internal name or display name to the collection.
	     *
	     * @param fieldTitleOrInternalName The case-sensitive internal name or display name of the field to add.
	     */
	    ViewFields.prototype.add = function (fieldTitleOrInternalName) {
	        var q = new ViewFields(this, "addviewfield('" + fieldTitleOrInternalName + "')");
	        return q.post();
	    };
	    /**
	     * Moves the field with the specified field internal name to the specified position in the collection.
	     *
	     * @param fieldInternalName The case-sensitive internal name of the field to move.
	     * @param index The zero-based index of the new position for the field.
	     */
	    ViewFields.prototype.move = function (fieldInternalName, index) {
	        var q = new ViewFields(this, "moveviewfieldto");
	        var postBody = JSON.stringify({ "field": fieldInternalName, "index": index });
	        return q.post({ body: postBody });
	    };
	    /**
	     * Removes all the fields from the collection.
	     */
	    ViewFields.prototype.removeAll = function () {
	        var q = new ViewFields(this, "removeallviewfields");
	        return q.post();
	    };
	    /**
	     * Removes the field with the specified field internal name from the collection.
	     *
	     * @param fieldInternalName The case-sensitive internal name of the field to remove from the view.
	     */
	    ViewFields.prototype.remove = function (fieldInternalName) {
	        var q = new ViewFields(this, "removeviewfield('" + fieldInternalName + "')");
	        return q.post();
	    };
	    return ViewFields;
	}(queryable_1.QueryableCollection));
	exports.ViewFields = ViewFields;


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var queryable_1 = __webpack_require__(15);
	var util_1 = __webpack_require__(5);
	var Types = __webpack_require__(38);
	/**
	 * Describes a collection of Field objects
	 *
	 */
	var Fields = (function (_super) {
	    __extends(Fields, _super);
	    /**
	     * Creates a new instance of the Fields class
	     *
	     * @param baseUrl The url or Queryable which forms the parent of this fields collection
	     */
	    function Fields(baseUrl, path) {
	        if (path === void 0) { path = "fields"; }
	        _super.call(this, baseUrl, path);
	    }
	    /**
	     * Gets a field from the collection by title
	     *
	     * @param title The case-sensitive title of the field
	     */
	    Fields.prototype.getByTitle = function (title) {
	        return new Field(this, "getByTitle('" + title + "')");
	    };
	    /**
	     * Gets a field from the collection by using internal name or title
	     *
	     * @param name The case-sensitive internal name or title of the field
	     */
	    Fields.prototype.getByInternalNameOrTitle = function (name) {
	        return new Field(this, "getByInternalNameOrTitle('" + name + "')");
	    };
	    /**
	     * Gets a list from the collection by guid id
	     *
	     * @param title The Id of the list
	     */
	    Fields.prototype.getById = function (id) {
	        var f = new Field(this);
	        f.concat("('" + id + "')");
	        return f;
	    };
	    /**
	     * Creates a field based on the specified schema
	     */
	    Fields.prototype.createFieldAsXml = function (xml) {
	        var _this = this;
	        var info;
	        if (typeof xml === "string") {
	            info = { SchemaXml: xml };
	        }
	        else {
	            info = xml;
	        }
	        var postBody = JSON.stringify({
	            "parameters": util_1.Util.extend({
	                "__metadata": {
	                    "type": "SP.XmlSchemaFieldCreationInformation",
	                },
	            }, info),
	        });
	        var q = new Fields(this, "createfieldasxml");
	        return q.postAs({ body: postBody }).then(function (data) {
	            return {
	                data: data,
	                field: _this.getById(data.Id),
	            };
	        });
	    };
	    /**
	     * Adds a new list to the collection
	     *
	     * @param title The new field's title
	     * @param fieldType The new field's type (ex: SP.FieldText)
	     * @param properties Differ by type of field being created (see: https://msdn.microsoft.com/en-us/library/office/dn600182.aspx)
	     */
	    Fields.prototype.add = function (title, fieldType, properties) {
	        var _this = this;
	        if (properties === void 0) { properties = {}; }
	        var postBody = JSON.stringify(util_1.Util.extend({
	            "__metadata": { "type": fieldType },
	            "Title": title,
	        }, properties));
	        return this.postAs({ body: postBody }).then(function (data) {
	            return {
	                data: data,
	                field: _this.getById(data.Id),
	            };
	        });
	    };
	    /**
	     * Adds a new SP.FieldText to the collection
	     *
	     * @param title The field title
	     * @param maxLength The maximum number of characters allowed in the value of the field.
	     * @param properties Differ by type of field being created (see: https://msdn.microsoft.com/en-us/library/office/dn600182.aspx)
	     */
	    Fields.prototype.addText = function (title, maxLength, properties) {
	        if (maxLength === void 0) { maxLength = 255; }
	        var props = {
	            FieldTypeKind: 2,
	        };
	        return this.add(title, "SP.FieldText", util_1.Util.extend(props, properties));
	    };
	    /**
	     * Adds a new SP.FieldCalculated to the collection
	     *
	     * @param title The field title.
	     * @param formula The formula for the field.
	     * @param dateFormat The date and time format that is displayed in the field.
	     * @param outputType Specifies the output format for the field. Represents a FieldType value.
	     * @param properties Differ by type of field being created (see: https://msdn.microsoft.com/en-us/library/office/dn600182.aspx)
	     */
	    Fields.prototype.addCalculated = function (title, formula, dateFormat, outputType, properties) {
	        if (outputType === void 0) { outputType = Types.FieldTypes.Text; }
	        var props = {
	            DateFormat: dateFormat,
	            FieldTypeKind: 17,
	            Formula: formula,
	            OutputType: outputType,
	        };
	        return this.add(title, "SP.FieldCalculated", util_1.Util.extend(props, properties));
	    };
	    /**
	     * Adds a new SP.FieldDateTime to the collection
	     *
	     * @param title The field title
	     * @param displayFormat The format of the date and time that is displayed in the field.
	     * @param calendarType Specifies the calendar type of the field.
	     * @param properties Differ by type of field being created (see: https://msdn.microsoft.com/en-us/library/office/dn600182.aspx)
	     */
	    Fields.prototype.addDateTime = function (title, displayFormat, calendarType, friendlyDisplayFormat, properties) {
	        if (displayFormat === void 0) { displayFormat = Types.DateTimeFieldFormatType.DateOnly; }
	        if (calendarType === void 0) { calendarType = Types.CalendarType.Gregorian; }
	        if (friendlyDisplayFormat === void 0) { friendlyDisplayFormat = 0; }
	        var props = {
	            DateTimeCalendarType: calendarType,
	            DisplayFormat: displayFormat,
	            FieldTypeKind: 4,
	            FriendlyDisplayFormat: friendlyDisplayFormat,
	        };
	        return this.add(title, "SP.FieldDateTime", util_1.Util.extend(props, properties));
	    };
	    /**
	     * Adds a new SP.FieldNumber to the collection
	     *
	     * @param title The field title
	     * @param minValue The field's minimum value
	     * @param maxValue The field's maximum value
	     * @param properties Differ by type of field being created (see: https://msdn.microsoft.com/en-us/library/office/dn600182.aspx)
	     */
	    Fields.prototype.addNumber = function (title, minValue, maxValue, properties) {
	        var props = { FieldTypeKind: 9 };
	        if (typeof minValue !== "undefined") {
	            props = util_1.Util.extend({ MinimumValue: minValue }, props);
	        }
	        if (typeof maxValue !== "undefined") {
	            props = util_1.Util.extend({ MaximumValue: maxValue }, props);
	        }
	        return this.add(title, "SP.FieldNumber", util_1.Util.extend(props, properties));
	    };
	    /**
	     * Adds a new SP.FieldCurrency to the collection
	     *
	     * @param title The field title
	     * @param minValue The field's minimum value
	     * @param maxValue The field's maximum value
	     * @param currencyLocalId Specifies the language code identifier (LCID) used to format the value of the field
	     * @param properties Differ by type of field being created (see: https://msdn.microsoft.com/en-us/library/office/dn600182.aspx)
	     */
	    Fields.prototype.addCurrency = function (title, minValue, maxValue, currencyLocalId, properties) {
	        if (currencyLocalId === void 0) { currencyLocalId = 1033; }
	        var props = {
	            CurrencyLocaleId: currencyLocalId,
	            FieldTypeKind: 10,
	        };
	        if (typeof minValue !== "undefined") {
	            props = util_1.Util.extend({ MinimumValue: minValue }, props);
	        }
	        if (typeof maxValue !== "undefined") {
	            props = util_1.Util.extend({ MaximumValue: maxValue }, props);
	        }
	        return this.add(title, "SP.FieldCurrency", util_1.Util.extend(props, properties));
	    };
	    /**
	     * Adds a new SP.FieldMultiLineText to the collection
	     *
	     * @param title The field title
	     * @param numberOfLines Specifies the number of lines of text to display for the field.
	     * @param richText Specifies whether the field supports rich formatting.
	     * @param restrictedMode Specifies whether the field supports a subset of rich formatting.
	     * @param appendOnly Specifies whether all changes to the value of the field are displayed in list forms.
	     * @param allowHyperlink Specifies whether a hyperlink is allowed as a value of the field.
	     * @param properties Differ by type of field being created (see: https://msdn.microsoft.com/en-us/library/office/dn600182.aspx)
	     *
	     */
	    Fields.prototype.addMultilineText = function (title, numberOfLines, richText, restrictedMode, appendOnly, allowHyperlink, properties) {
	        if (numberOfLines === void 0) { numberOfLines = 6; }
	        if (richText === void 0) { richText = true; }
	        if (restrictedMode === void 0) { restrictedMode = false; }
	        if (appendOnly === void 0) { appendOnly = false; }
	        if (allowHyperlink === void 0) { allowHyperlink = true; }
	        var props = {
	            AllowHyperlink: allowHyperlink,
	            AppendOnly: appendOnly,
	            FieldTypeKind: 3,
	            NumberOfLines: numberOfLines,
	            RestrictedMode: restrictedMode,
	            RichText: richText,
	        };
	        return this.add(title, "SP.FieldMultiLineText", util_1.Util.extend(props, properties));
	    };
	    /**
	     * Adds a new SP.FieldUrl to the collection
	     *
	     * @param title The field title
	     */
	    Fields.prototype.addUrl = function (title, displayFormat, properties) {
	        if (displayFormat === void 0) { displayFormat = Types.UrlFieldFormatType.Hyperlink; }
	        var props = {
	            DisplayFormat: displayFormat,
	            FieldTypeKind: 11,
	        };
	        return this.add(title, "SP.FieldUrl", util_1.Util.extend(props, properties));
	    };
	    return Fields;
	}(queryable_1.QueryableCollection));
	exports.Fields = Fields;
	/**
	 * Describes a single of Field instance
	 *
	 */
	var Field = (function (_super) {
	    __extends(Field, _super);
	    /**
	     * Creates a new instance of the Field class
	     *
	     * @param baseUrl The url or Queryable which forms the parent of this field instance
	     */
	    function Field(baseUrl, path) {
	        _super.call(this, baseUrl, path);
	    }
	    /**
	     * Updates this field intance with the supplied properties
	     *
	     * @param properties A plain object hash of values to update for the list
	     * @param fieldType The type value, required to update child field type properties
	     */
	    Field.prototype.update = function (properties, fieldType) {
	        var _this = this;
	        if (fieldType === void 0) { fieldType = "SP.Field"; }
	        var postBody = JSON.stringify(util_1.Util.extend({
	            "__metadata": { "type": fieldType },
	        }, properties));
	        return this.post({
	            body: postBody,
	            headers: {
	                "X-HTTP-Method": "MERGE",
	            },
	        }).then(function (data) {
	            return {
	                data: data,
	                field: _this,
	            };
	        });
	    };
	    /**
	     * Delete this fields
	     *
	     */
	    Field.prototype.delete = function () {
	        return this.post({
	            headers: {
	                "X-HTTP-Method": "DELETE",
	            },
	        });
	    };
	    /**
	     * Sets the value of the ShowInDisplayForm property for this field.
	     */
	    Field.prototype.setShowInDisplayForm = function (show) {
	        var q = new Field(this, "setshowindisplayform(" + show + ")");
	        return q.post();
	    };
	    /**
	     * Sets the value of the ShowInEditForm property for this field.
	     */
	    Field.prototype.setShowInEditForm = function (show) {
	        var q = new Field(this, "setshowineditform(" + show + ")");
	        return q.post();
	    };
	    /**
	     * Sets the value of the ShowInNewForm property for this field.
	     */
	    Field.prototype.setShowInNewForm = function (show) {
	        var q = new Field(this, "setshowinnewform(" + show + ")");
	        return q.post();
	    };
	    return Field;
	}(queryable_1.QueryableInstance));
	exports.Field = Field;


/***/ },
/* 38 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * Determines the display mode of the given control or view
	 */
	(function (ControlMode) {
	    ControlMode[ControlMode["Display"] = 1] = "Display";
	    ControlMode[ControlMode["Edit"] = 2] = "Edit";
	    ControlMode[ControlMode["New"] = 3] = "New";
	})(exports.ControlMode || (exports.ControlMode = {}));
	var ControlMode = exports.ControlMode;
	/**
	 * Specifies the type of the field.
	 */
	(function (FieldTypes) {
	    FieldTypes[FieldTypes["Invalid"] = 0] = "Invalid";
	    FieldTypes[FieldTypes["Integer"] = 1] = "Integer";
	    FieldTypes[FieldTypes["Text"] = 2] = "Text";
	    FieldTypes[FieldTypes["Note"] = 3] = "Note";
	    FieldTypes[FieldTypes["DateTime"] = 4] = "DateTime";
	    FieldTypes[FieldTypes["Counter"] = 5] = "Counter";
	    FieldTypes[FieldTypes["Choice"] = 6] = "Choice";
	    FieldTypes[FieldTypes["Lookup"] = 7] = "Lookup";
	    FieldTypes[FieldTypes["Boolean"] = 8] = "Boolean";
	    FieldTypes[FieldTypes["Number"] = 9] = "Number";
	    FieldTypes[FieldTypes["Currency"] = 10] = "Currency";
	    FieldTypes[FieldTypes["URL"] = 11] = "URL";
	    FieldTypes[FieldTypes["Computed"] = 12] = "Computed";
	    FieldTypes[FieldTypes["Threading"] = 13] = "Threading";
	    FieldTypes[FieldTypes["Guid"] = 14] = "Guid";
	    FieldTypes[FieldTypes["MultiChoice"] = 15] = "MultiChoice";
	    FieldTypes[FieldTypes["GridChoice"] = 16] = "GridChoice";
	    FieldTypes[FieldTypes["Calculated"] = 17] = "Calculated";
	    FieldTypes[FieldTypes["File"] = 18] = "File";
	    FieldTypes[FieldTypes["Attachments"] = 19] = "Attachments";
	    FieldTypes[FieldTypes["User"] = 20] = "User";
	    FieldTypes[FieldTypes["Recurrence"] = 21] = "Recurrence";
	    FieldTypes[FieldTypes["CrossProjectLink"] = 22] = "CrossProjectLink";
	    FieldTypes[FieldTypes["ModStat"] = 23] = "ModStat";
	    FieldTypes[FieldTypes["Error"] = 24] = "Error";
	    FieldTypes[FieldTypes["ContentTypeId"] = 25] = "ContentTypeId";
	    FieldTypes[FieldTypes["PageSeparator"] = 26] = "PageSeparator";
	    FieldTypes[FieldTypes["ThreadIndex"] = 27] = "ThreadIndex";
	    FieldTypes[FieldTypes["WorkflowStatus"] = 28] = "WorkflowStatus";
	    FieldTypes[FieldTypes["AllDayEvent"] = 29] = "AllDayEvent";
	    FieldTypes[FieldTypes["WorkflowEventType"] = 30] = "WorkflowEventType";
	})(exports.FieldTypes || (exports.FieldTypes = {}));
	var FieldTypes = exports.FieldTypes;
	(function (DateTimeFieldFormatType) {
	    DateTimeFieldFormatType[DateTimeFieldFormatType["DateOnly"] = 0] = "DateOnly";
	    DateTimeFieldFormatType[DateTimeFieldFormatType["DateTime"] = 1] = "DateTime";
	})(exports.DateTimeFieldFormatType || (exports.DateTimeFieldFormatType = {}));
	var DateTimeFieldFormatType = exports.DateTimeFieldFormatType;
	/**
	 * Specifies the control settings while adding a field.
	 */
	(function (AddFieldOptions) {
	    /**
	     *  Specify that a new field added to the list must also be added to the default content type in the site collection
	     */
	    AddFieldOptions[AddFieldOptions["DefaultValue"] = 0] = "DefaultValue";
	    /**
	     * Specify that a new field added to the list must also be added to the default content type in the site collection.
	     */
	    AddFieldOptions[AddFieldOptions["AddToDefaultContentType"] = 1] = "AddToDefaultContentType";
	    /**
	     * Specify that a new field must not be added to any other content type
	     */
	    AddFieldOptions[AddFieldOptions["AddToNoContentType"] = 2] = "AddToNoContentType";
	    /**
	     *  Specify that a new field that is added to the specified list must also be added to all content types in the site collection
	     */
	    AddFieldOptions[AddFieldOptions["AddToAllContentTypes"] = 4] = "AddToAllContentTypes";
	    /**
	     * Specify adding an internal field name hint for the purpose of avoiding possible database locking or field renaming operations
	     */
	    AddFieldOptions[AddFieldOptions["AddFieldInternalNameHint"] = 8] = "AddFieldInternalNameHint";
	    /**
	     * Specify that a new field that is added to the specified list must also be added to the default list view
	     */
	    AddFieldOptions[AddFieldOptions["AddFieldToDefaultView"] = 16] = "AddFieldToDefaultView";
	    /**
	     * Specify to confirm that no other field has the same display name
	     */
	    AddFieldOptions[AddFieldOptions["AddFieldCheckDisplayName"] = 32] = "AddFieldCheckDisplayName";
	})(exports.AddFieldOptions || (exports.AddFieldOptions = {}));
	var AddFieldOptions = exports.AddFieldOptions;
	(function (CalendarType) {
	    CalendarType[CalendarType["Gregorian"] = 1] = "Gregorian";
	    CalendarType[CalendarType["Japan"] = 3] = "Japan";
	    CalendarType[CalendarType["Taiwan"] = 4] = "Taiwan";
	    CalendarType[CalendarType["Korea"] = 5] = "Korea";
	    CalendarType[CalendarType["Hijri"] = 6] = "Hijri";
	    CalendarType[CalendarType["Thai"] = 7] = "Thai";
	    CalendarType[CalendarType["Hebrew"] = 8] = "Hebrew";
	    CalendarType[CalendarType["GregorianMEFrench"] = 9] = "GregorianMEFrench";
	    CalendarType[CalendarType["GregorianArabic"] = 10] = "GregorianArabic";
	    CalendarType[CalendarType["GregorianXLITEnglish"] = 11] = "GregorianXLITEnglish";
	    CalendarType[CalendarType["GregorianXLITFrench"] = 12] = "GregorianXLITFrench";
	    CalendarType[CalendarType["KoreaJapanLunar"] = 14] = "KoreaJapanLunar";
	    CalendarType[CalendarType["ChineseLunar"] = 15] = "ChineseLunar";
	    CalendarType[CalendarType["SakaEra"] = 16] = "SakaEra";
	    CalendarType[CalendarType["UmAlQura"] = 23] = "UmAlQura";
	})(exports.CalendarType || (exports.CalendarType = {}));
	var CalendarType = exports.CalendarType;
	(function (UrlFieldFormatType) {
	    UrlFieldFormatType[UrlFieldFormatType["Hyperlink"] = 0] = "Hyperlink";
	    UrlFieldFormatType[UrlFieldFormatType["Image"] = 1] = "Image";
	})(exports.UrlFieldFormatType || (exports.UrlFieldFormatType = {}));
	var UrlFieldFormatType = exports.UrlFieldFormatType;
	(function (PrincipalType) {
	    PrincipalType[PrincipalType["None"] = 0] = "None";
	    PrincipalType[PrincipalType["User"] = 1] = "User";
	    PrincipalType[PrincipalType["DistributionList"] = 2] = "DistributionList";
	    PrincipalType[PrincipalType["SecurityGroup"] = 4] = "SecurityGroup";
	    PrincipalType[PrincipalType["SharePointGroup"] = 8] = "SharePointGroup";
	    PrincipalType[PrincipalType["All"] = 15] = "All";
	})(exports.PrincipalType || (exports.PrincipalType = {}));
	var PrincipalType = exports.PrincipalType;
	(function (PageType) {
	    PageType[PageType["Invalid"] = -1] = "Invalid";
	    PageType[PageType["DefaultView"] = 0] = "DefaultView";
	    PageType[PageType["NormalView"] = 1] = "NormalView";
	    PageType[PageType["DialogView"] = 2] = "DialogView";
	    PageType[PageType["View"] = 3] = "View";
	    PageType[PageType["DisplayForm"] = 4] = "DisplayForm";
	    PageType[PageType["DisplayFormDialog"] = 5] = "DisplayFormDialog";
	    PageType[PageType["EditForm"] = 6] = "EditForm";
	    PageType[PageType["EditFormDialog"] = 7] = "EditFormDialog";
	    PageType[PageType["NewForm"] = 8] = "NewForm";
	    PageType[PageType["NewFormDialog"] = 9] = "NewFormDialog";
	    PageType[PageType["SolutionForm"] = 10] = "SolutionForm";
	    PageType[PageType["PAGE_MAXITEMS"] = 11] = "PAGE_MAXITEMS";
	})(exports.PageType || (exports.PageType = {}));
	var PageType = exports.PageType;


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var queryable_1 = __webpack_require__(15);
	/**
	 * Describes a collection of Field objects
	 *
	 */
	var Forms = (function (_super) {
	    __extends(Forms, _super);
	    /**
	     * Creates a new instance of the Fields class
	     *
	     * @param baseUrl The url or Queryable which forms the parent of this fields collection
	     */
	    function Forms(baseUrl, path) {
	        if (path === void 0) { path = "forms"; }
	        _super.call(this, baseUrl, path);
	    }
	    /**
	     * Gets a form by id
	     *
	     * @param id The guid id of the item to retrieve
	     */
	    Forms.prototype.getById = function (id) {
	        var i = new Form(this);
	        i.concat("('" + id + "')");
	        return i;
	    };
	    return Forms;
	}(queryable_1.QueryableCollection));
	exports.Forms = Forms;
	/**
	 * Describes a single of Form instance
	 *
	 */
	var Form = (function (_super) {
	    __extends(Form, _super);
	    /**
	     * Creates a new instance of the Form class
	     *
	     * @param baseUrl The url or Queryable which is the parent of this form instance
	     */
	    function Form(baseUrl, path) {
	        _super.call(this, baseUrl, path);
	    }
	    return Form;
	}(queryable_1.QueryableInstance));
	exports.Form = Form;


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var queryable_1 = __webpack_require__(15);
	/**
	 * Describes a collection of webhook subscriptions
	 *
	 */
	var Subscriptions = (function (_super) {
	    __extends(Subscriptions, _super);
	    /**
	     * Creates a new instance of the Subscriptions class
	     *
	     * @param baseUrl - The url or Queryable which forms the parent of this webhook subscriptions collection
	     */
	    function Subscriptions(baseUrl, path) {
	        if (path === void 0) { path = "subscriptions"; }
	        _super.call(this, baseUrl, path);
	    }
	    /**
	     * Returns all the webhook subscriptions or the specified webhook subscription
	     *
	     */
	    Subscriptions.prototype.getById = function (subscriptionId) {
	        var subscription = new Subscription(this);
	        subscription.concat("('" + subscriptionId + "')");
	        return subscription;
	    };
	    /**
	     * Create a new webhook subscription
	     *
	     */
	    Subscriptions.prototype.add = function (notificationUrl, expirationDate, clientState) {
	        var _this = this;
	        var postBody = JSON.stringify({
	            "resource": this.toUrl(),
	            "notificationUrl": notificationUrl,
	            "expirationDateTime": expirationDate,
	            "clientState": clientState || "pnp-js-core-subscription",
	        });
	        return this.post({ body: postBody, headers: { "Content-Type": "application/json" } }).then(function (result) {
	            return { data: result, subscription: _this.getById(result.id) };
	        });
	    };
	    return Subscriptions;
	}(queryable_1.QueryableCollection));
	exports.Subscriptions = Subscriptions;
	/**
	 * Describes a single webhook subscription instance
	 *
	 */
	var Subscription = (function (_super) {
	    __extends(Subscription, _super);
	    /**
	     * Creates a new instance of the Subscription class
	     *
	     * @param baseUrl - The url or Queryable which forms the parent of this webhook subscription instance
	     */
	    function Subscription(baseUrl, path) {
	        _super.call(this, baseUrl, path);
	    }
	    /**
	     * Update a webhook subscription
	     *
	     */
	    Subscription.prototype.update = function (expirationDate) {
	        var _this = this;
	        var postBody = JSON.stringify({
	            "expirationDateTime": expirationDate,
	        });
	        return this.patch({ body: postBody, headers: { "Content-Type": "application/json" } }).then(function (data) {
	            return { data: data, subscription: _this };
	        });
	    };
	    /**
	     * Remove a webhook subscription
	     *
	     */
	    Subscription.prototype.delete = function () {
	        return _super.prototype.delete.call(this);
	    };
	    return Subscription;
	}(queryable_1.QueryableInstance));
	exports.Subscription = Subscription;


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var queryable_1 = __webpack_require__(15);
	var util_1 = __webpack_require__(5);
	var UserCustomActions = (function (_super) {
	    __extends(UserCustomActions, _super);
	    function UserCustomActions(baseUrl, path) {
	        if (path === void 0) { path = "usercustomactions"; }
	        _super.call(this, baseUrl, path);
	    }
	    /**
	     * Returns the custom action with the specified identifier.
	     *
	     * @param id The GUID ID of the user custom action to get.
	     */
	    UserCustomActions.prototype.getById = function (id) {
	        return new UserCustomAction(this, "(" + id + ")");
	    };
	    /**
	     * Create a custom action
	     *
	     * @param creationInfo The information which defines the new custom action
	     *
	     */
	    UserCustomActions.prototype.add = function (properties) {
	        var _this = this;
	        var postBody = JSON.stringify(util_1.Util.extend({ __metadata: { "type": "SP.UserCustomAction" } }, properties));
	        return this.post({ body: postBody }).then(function (data) {
	            return {
	                action: _this.getById(data.Id),
	                data: data,
	            };
	        });
	    };
	    /**
	     * Deletes all custom actions in the collection.
	     *
	     */
	    UserCustomActions.prototype.clear = function () {
	        var a = new UserCustomActions(this, "clear");
	        return a.post();
	    };
	    return UserCustomActions;
	}(queryable_1.QueryableCollection));
	exports.UserCustomActions = UserCustomActions;
	var UserCustomAction = (function (_super) {
	    __extends(UserCustomAction, _super);
	    function UserCustomAction(baseUrl, path) {
	        _super.call(this, baseUrl, path);
	    }
	    UserCustomAction.prototype.update = function (properties) {
	        var _this = this;
	        var postBody = JSON.stringify(util_1.Util.extend({
	            "__metadata": { "type": "SP.UserCustomAction" },
	        }, properties));
	        return this.post({
	            body: postBody,
	            headers: {
	                "X-HTTP-Method": "MERGE",
	            },
	        }).then(function (data) {
	            return {
	                action: _this,
	                data: data,
	            };
	        });
	    };
	    return UserCustomAction;
	}(queryable_1.QueryableInstance));
	exports.UserCustomAction = UserCustomAction;


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var queryable_1 = __webpack_require__(15);
	var quicklaunch_1 = __webpack_require__(43);
	var topnavigationbar_1 = __webpack_require__(44);
	/**
	 * Exposes the navigation components
	 *
	 */
	var Navigation = (function (_super) {
	    __extends(Navigation, _super);
	    /**
	     * Creates a new instance of the Lists class
	     *
	     * @param baseUrl The url or Queryable which forms the parent of this fields collection
	     */
	    function Navigation(baseUrl) {
	        _super.call(this, baseUrl, "navigation");
	    }
	    Object.defineProperty(Navigation.prototype, "quicklaunch", {
	        /**
	         * Gets the quicklaunch navigation for the current context
	         *
	         */
	        get: function () {
	            return new quicklaunch_1.QuickLaunch(this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Navigation.prototype, "topNavigationBar", {
	        /**
	         * Gets the top bar navigation navigation for the current context
	         *
	         */
	        get: function () {
	            return new topnavigationbar_1.TopNavigationBar(this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return Navigation;
	}(queryable_1.Queryable));
	exports.Navigation = Navigation;


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var queryable_1 = __webpack_require__(15);
	/**
	 * Describes the quick launch navigation
	 *
	 */
	var QuickLaunch = (function (_super) {
	    __extends(QuickLaunch, _super);
	    /**
	     * Creates a new instance of the Lists class
	     *
	     * @param baseUrl The url or Queryable which forms the parent of this fields collection
	     */
	    function QuickLaunch(baseUrl) {
	        _super.call(this, baseUrl, "QuickLaunch");
	    }
	    return QuickLaunch;
	}(queryable_1.Queryable));
	exports.QuickLaunch = QuickLaunch;


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var queryable_1 = __webpack_require__(15);
	/**
	 * Describes the top navigation on the site
	 *
	 */
	var TopNavigationBar = (function (_super) {
	    __extends(TopNavigationBar, _super);
	    /**
	     * Creates a new instance of the SiteUsers class
	     *
	     * @param baseUrl The url or Queryable which forms the parent of this fields collection
	     */
	    function TopNavigationBar(baseUrl) {
	        _super.call(this, baseUrl, "TopNavigationBar");
	    }
	    return TopNavigationBar;
	}(queryable_1.QueryableInstance));
	exports.TopNavigationBar = TopNavigationBar;


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var queryable_1 = __webpack_require__(15);
	var FileUtil = __webpack_require__(46);
	var odata_1 = __webpack_require__(19);
	var UserProfileQuery = (function (_super) {
	    __extends(UserProfileQuery, _super);
	    function UserProfileQuery(baseUrl, path) {
	        if (path === void 0) { path = "_api/sp.userprofiles.peoplemanager"; }
	        _super.call(this, baseUrl, path);
	        this.profileLoader = new ProfileLoader(baseUrl);
	    }
	    Object.defineProperty(UserProfileQuery.prototype, "editProfileLink", {
	        /**
	         * The URL of the edit profile page for the current user.
	         */
	        get: function () {
	            var q = new UserProfileQuery(this, "EditProfileLink");
	            return q.getAs(odata_1.ODataValue());
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(UserProfileQuery.prototype, "isMyPeopleListPublic", {
	        /**
	         * A Boolean value that indicates whether the current user's People I'm Following list is public.
	         */
	        get: function () {
	            var q = new UserProfileQuery(this, "IsMyPeopleListPublic");
	            return q.getAs(odata_1.ODataValue());
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * A Boolean value that indicates whether the current user's People I'm Following list is public.
	     *
	     * @param loginName The account name of the user
	     */
	    UserProfileQuery.prototype.amIFollowedBy = function (loginName) {
	        var q = new UserProfileQuery(this, "amifollowedby(@v)");
	        q.query.add("@v", "'" + encodeURIComponent(loginName) + "'");
	        return q.get();
	    };
	    /**
	     * Checks whether the current user is following the specified user.
	     *
	     * @param loginName The account name of the user
	     */
	    UserProfileQuery.prototype.amIFollowing = function (loginName) {
	        var q = new UserProfileQuery(this, "amifollowing(@v)");
	        q.query.add("@v", "'" + encodeURIComponent(loginName) + "'");
	        return q.get();
	    };
	    /**
	     * Gets tags that the user is following.
	     *
	     * @param maxCount The maximum number of tags to get.
	     */
	    UserProfileQuery.prototype.getFollowedTags = function (maxCount) {
	        if (maxCount === void 0) { maxCount = 20; }
	        var q = new UserProfileQuery(this, "getfollowedtags(" + maxCount + ")");
	        return q.get();
	    };
	    /**
	     * Gets the people who are following the specified user.
	     *
	     * @param loginName The account name of the user.
	     */
	    UserProfileQuery.prototype.getFollowersFor = function (loginName) {
	        var q = new UserProfileQuery(this, "getfollowersfor(@v)");
	        q.query.add("@v", "'" + encodeURIComponent(loginName) + "'");
	        return q.get();
	    };
	    Object.defineProperty(UserProfileQuery.prototype, "myFollowers", {
	        /**
	         * Gets the people who are following the current user.
	         *
	         */
	        get: function () {
	            return new queryable_1.QueryableCollection(this, "getmyfollowers");
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(UserProfileQuery.prototype, "myProperties", {
	        /**
	         * Gets user properties for the current user.
	         *
	         */
	        get: function () {
	            return new UserProfileQuery(this, "getmyproperties");
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Gets the people who the specified user is following.
	     *
	     * @param loginName The account name of the user.
	     */
	    UserProfileQuery.prototype.getPeopleFollowedBy = function (loginName) {
	        var q = new UserProfileQuery(this, "getpeoplefollowedby(@v)");
	        q.query.add("@v", "'" + encodeURIComponent(loginName) + "'");
	        return q.get();
	    };
	    /**
	     * Gets user properties for the specified user.
	     *
	     * @param loginName The account name of the user.
	     */
	    UserProfileQuery.prototype.getPropertiesFor = function (loginName) {
	        var q = new UserProfileQuery(this, "getpropertiesfor(@v)");
	        q.query.add("@v", "'" + encodeURIComponent(loginName) + "'");
	        return q.get();
	    };
	    Object.defineProperty(UserProfileQuery.prototype, "trendingTags", {
	        /**
	         * Gets the most popular tags.
	         *
	         */
	        get: function () {
	            var q = new UserProfileQuery(this, null);
	            q.concat(".gettrendingtags");
	            return q.get();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Gets the specified user profile property for the specified user.
	     *
	     * @param loginName The account name of the user.
	     * @param propertyName The case-sensitive name of the property to get.
	     */
	    UserProfileQuery.prototype.getUserProfilePropertyFor = function (loginName, propertyName) {
	        var q = new UserProfileQuery(this, "getuserprofilepropertyfor(accountname=@v, propertyname='" + propertyName + "')");
	        q.query.add("@v", "'" + encodeURIComponent(loginName) + "'");
	        return q.get();
	    };
	    /**
	     * Removes the specified user from the user's list of suggested people to follow.
	     *
	     * @param loginName The account name of the user.
	     */
	    UserProfileQuery.prototype.hideSuggestion = function (loginName) {
	        var q = new UserProfileQuery(this, "hidesuggestion(@v)");
	        q.query.add("@v", "'" + encodeURIComponent(loginName) + "'");
	        return q.post();
	    };
	    /**
	     * Checks whether the first user is following the second user.
	     *
	     * @param follower The account name of the user who might be following followee.
	     * @param followee The account name of the user who might be followed.
	     */
	    UserProfileQuery.prototype.isFollowing = function (follower, followee) {
	        var q = new UserProfileQuery(this, null);
	        q.concat(".isfollowing(possiblefolloweraccountname=@v, possiblefolloweeaccountname=@y)");
	        q.query.add("@v", "'" + encodeURIComponent(follower) + "'");
	        q.query.add("@y", "'" + encodeURIComponent(followee) + "'");
	        return q.get();
	    };
	    /**
	     * Uploads and sets the user profile picture
	     *
	     * @param profilePicSource Blob data representing the user's picture
	     */
	    UserProfileQuery.prototype.setMyProfilePic = function (profilePicSource) {
	        var _this = this;
	        return FileUtil.readBlobAsArrayBuffer(profilePicSource).then(function (buffer) {
	            var request = new UserProfileQuery(_this, "setmyprofilepicture");
	            return request.post({
	                body: String.fromCharCode.apply(null, new Uint16Array(buffer)),
	            });
	        });
	    };
	    /**
	     * Provisions one or more users' personal sites. (My Site administrator on SharePoint Online only)
	     *
	     * @param emails The email addresses of the users to provision sites for
	     */
	    UserProfileQuery.prototype.createPersonalSiteEnqueueBulk = function () {
	        var emails = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            emails[_i - 0] = arguments[_i];
	        }
	        return this.profileLoader.createPersonalSiteEnqueueBulk(emails);
	    };
	    Object.defineProperty(UserProfileQuery.prototype, "ownerUserProfile", {
	        /**
	         * Gets the user profile of the site owner.
	         *
	         */
	        get: function () {
	            return this.profileLoader.ownerUserProfile;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(UserProfileQuery.prototype, "userProfile", {
	        /**
	         * Gets the user profile that corresponds to the current user.
	         */
	        get: function () {
	            return this.profileLoader.userProfile;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Enqueues creating a personal site for this user, which can be used to share documents, web pages, and other files.
	     *
	     * @param interactiveRequest true if interactively (web) initiated request, or false if non-interactively (client) initiated request
	     */
	    UserProfileQuery.prototype.createPersonalSite = function (interactiveRequest) {
	        if (interactiveRequest === void 0) { interactiveRequest = false; }
	        return this.profileLoader.createPersonalSite(interactiveRequest);
	    };
	    /**
	     * Sets the privacy settings for this profile.
	     *
	     * @param share true to make all social data public; false to make all social data private.
	     */
	    UserProfileQuery.prototype.shareAllSocialData = function (share) {
	        return this.profileLoader.shareAllSocialData(share);
	    };
	    return UserProfileQuery;
	}(queryable_1.QueryableInstance));
	exports.UserProfileQuery = UserProfileQuery;
	var ProfileLoader = (function (_super) {
	    __extends(ProfileLoader, _super);
	    function ProfileLoader(baseUrl, path) {
	        if (path === void 0) { path = "_api/sp.userprofiles.profileloader.getprofileloader"; }
	        _super.call(this, baseUrl, path);
	    }
	    /**
	     * Provisions one or more users' personal sites. (My Site administrator on SharePoint Online only)
	     *
	     * @param emails The email addresses of the users to provision sites for
	     */
	    ProfileLoader.prototype.createPersonalSiteEnqueueBulk = function (emails) {
	        var q = new ProfileLoader(this, "createpersonalsiteenqueuebulk");
	        var postBody = JSON.stringify({ "emailIDs": emails });
	        return q.post({
	            body: postBody,
	        });
	    };
	    Object.defineProperty(ProfileLoader.prototype, "ownerUserProfile", {
	        /**
	         * Gets the user profile of the site owner.
	         *
	         */
	        get: function () {
	            var q = this.getParent(ProfileLoader, this.parentUrl, "_api/sp.userprofiles.profileloader.getowneruserprofile");
	            return q.postAs();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ProfileLoader.prototype, "userProfile", {
	        /**
	         * Gets the user profile that corresponds to the current user.
	         *
	         */
	        get: function () {
	            var q = new ProfileLoader(this, "getuserprofile");
	            return q.postAs();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Enqueues creating a personal site for this user, which can be used to share documents, web pages, and other files.
	     *
	     * @param interactiveRequest true if interactively (web) initiated request, or false if non-interactively (client) initiated request
	     */
	    ProfileLoader.prototype.createPersonalSite = function (interactiveRequest) {
	        if (interactiveRequest === void 0) { interactiveRequest = false; }
	        var q = new ProfileLoader(this, "getuserprofile/createpersonalsiteenque(" + interactiveRequest + ")\",");
	        return q.post();
	    };
	    /**
	     * Sets the privacy settings for this profile.
	     *
	     * @param share true to make all social data public; false to make all social data private.
	     */
	    ProfileLoader.prototype.shareAllSocialData = function (share) {
	        var q = new ProfileLoader(this, "getuserprofile/shareallsocialdata(" + share + ")\",");
	        return q.post();
	    };
	    return ProfileLoader;
	}(queryable_1.Queryable));


/***/ },
/* 46 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * Reads a blob as text
	 *
	 * @param blob The data to read
	 */
	function readBlobAsText(blob) {
	    return readBlobAs(blob, "string");
	}
	exports.readBlobAsText = readBlobAsText;
	/**
	 * Reads a blob into an array buffer
	 *
	 * @param blob The data to read
	 */
	function readBlobAsArrayBuffer(blob) {
	    return readBlobAs(blob, "buffer");
	}
	exports.readBlobAsArrayBuffer = readBlobAsArrayBuffer;
	/**
	 * Generic method to read blob's content
	 *
	 * @param blob The data to read
	 * @param mode The read mode
	 */
	function readBlobAs(blob, mode) {
	    return new Promise(function (resolve, reject) {
	        var reader = new FileReader();
	        reader.onload = function (e) {
	            resolve(e.target.result);
	        };
	        switch (mode) {
	            case "string":
	                reader.readAsText(blob);
	                break;
	            case "buffer":
	                reader.readAsArrayBuffer(blob);
	                break;
	        }
	    });
	}


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(48));
	var httpclient_1 = __webpack_require__(16);
	exports.HttpClient = httpclient_1.HttpClient;
	var collections_1 = __webpack_require__(8);
	exports.Dictionary = collections_1.Dictionary;
	var util_1 = __webpack_require__(5);
	exports.Util = util_1.Util;
	__export(__webpack_require__(12));


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(23));
	var files_1 = __webpack_require__(34);
	exports.CheckinType = files_1.CheckinType;
	exports.WebPartsPersonalizationScope = files_1.WebPartsPersonalizationScope;
	exports.MoveOperations = files_1.MoveOperations;
	exports.TemplateFileType = files_1.TemplateFileType;
	exports.TextFileParser = files_1.TextFileParser;
	exports.BlobFileParser = files_1.BlobFileParser;
	exports.BufferFileParser = files_1.BufferFileParser;
	var items_1 = __webpack_require__(32);
	exports.PagedItemCollection = items_1.PagedItemCollection;
	var odata_1 = __webpack_require__(19);
	exports.extractOdataId = odata_1.extractOdataId;
	exports.ODataParserBase = odata_1.ODataParserBase;
	exports.ODataDefaultParser = odata_1.ODataDefaultParser;
	exports.ODataRaw = odata_1.ODataRaw;
	exports.ODataValue = odata_1.ODataValue;
	exports.ODataEntity = odata_1.ODataEntity;
	exports.ODataEntityArray = odata_1.ODataEntityArray;
	var roles_1 = __webpack_require__(28);
	exports.RoleDefinitionBindings = roles_1.RoleDefinitionBindings;
	var search_1 = __webpack_require__(14);
	exports.Search = search_1.Search;
	exports.SearchResult = search_1.SearchResult;
	exports.SearchResults = search_1.SearchResults;
	exports.SortDirection = search_1.SortDirection;
	exports.ReorderingRuleMatchType = search_1.ReorderingRuleMatchType;
	exports.QueryPropertyValueType = search_1.QueryPropertyValueType;
	var searchsuggest_1 = __webpack_require__(24);
	exports.SearchSuggest = searchsuggest_1.SearchSuggest;
	exports.SearchSuggestResult = searchsuggest_1.SearchSuggestResult;
	var site_1 = __webpack_require__(25);
	exports.Site = site_1.Site;
	__export(__webpack_require__(38));
	var webs_1 = __webpack_require__(26);
	exports.Web = webs_1.Web;


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Underscore.js 1.8.3
	//     http://underscorejs.org
	//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	//     Underscore may be freely distributed under the MIT license.
	
	(function() {
	
	  // Baseline setup
	  // --------------
	
	  // Establish the root object, `window` in the browser, or `exports` on the server.
	  var root = this;
	
	  // Save the previous value of the `_` variable.
	  var previousUnderscore = root._;
	
	  // Save bytes in the minified (but not gzipped) version:
	  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;
	
	  // Create quick reference variables for speed access to core prototypes.
	  var
	    push             = ArrayProto.push,
	    slice            = ArrayProto.slice,
	    toString         = ObjProto.toString,
	    hasOwnProperty   = ObjProto.hasOwnProperty;
	
	  // All **ECMAScript 5** native function implementations that we hope to use
	  // are declared here.
	  var
	    nativeIsArray      = Array.isArray,
	    nativeKeys         = Object.keys,
	    nativeBind         = FuncProto.bind,
	    nativeCreate       = Object.create;
	
	  // Naked function reference for surrogate-prototype-swapping.
	  var Ctor = function(){};
	
	  // Create a safe reference to the Underscore object for use below.
	  var _ = function(obj) {
	    if (obj instanceof _) return obj;
	    if (!(this instanceof _)) return new _(obj);
	    this._wrapped = obj;
	  };
	
	  // Export the Underscore object for **Node.js**, with
	  // backwards-compatibility for the old `require()` API. If we're in
	  // the browser, add `_` as a global object.
	  if (true) {
	    if (typeof module !== 'undefined' && module.exports) {
	      exports = module.exports = _;
	    }
	    exports._ = _;
	  } else {
	    root._ = _;
	  }
	
	  // Current version.
	  _.VERSION = '1.8.3';
	
	  // Internal function that returns an efficient (for current engines) version
	  // of the passed-in callback, to be repeatedly applied in other Underscore
	  // functions.
	  var optimizeCb = function(func, context, argCount) {
	    if (context === void 0) return func;
	    switch (argCount == null ? 3 : argCount) {
	      case 1: return function(value) {
	        return func.call(context, value);
	      };
	      case 2: return function(value, other) {
	        return func.call(context, value, other);
	      };
	      case 3: return function(value, index, collection) {
	        return func.call(context, value, index, collection);
	      };
	      case 4: return function(accumulator, value, index, collection) {
	        return func.call(context, accumulator, value, index, collection);
	      };
	    }
	    return function() {
	      return func.apply(context, arguments);
	    };
	  };
	
	  // A mostly-internal function to generate callbacks that can be applied
	  // to each element in a collection, returning the desired result — either
	  // identity, an arbitrary callback, a property matcher, or a property accessor.
	  var cb = function(value, context, argCount) {
	    if (value == null) return _.identity;
	    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
	    if (_.isObject(value)) return _.matcher(value);
	    return _.property(value);
	  };
	  _.iteratee = function(value, context) {
	    return cb(value, context, Infinity);
	  };
	
	  // An internal function for creating assigner functions.
	  var createAssigner = function(keysFunc, undefinedOnly) {
	    return function(obj) {
	      var length = arguments.length;
	      if (length < 2 || obj == null) return obj;
	      for (var index = 1; index < length; index++) {
	        var source = arguments[index],
	            keys = keysFunc(source),
	            l = keys.length;
	        for (var i = 0; i < l; i++) {
	          var key = keys[i];
	          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
	        }
	      }
	      return obj;
	    };
	  };
	
	  // An internal function for creating a new object that inherits from another.
	  var baseCreate = function(prototype) {
	    if (!_.isObject(prototype)) return {};
	    if (nativeCreate) return nativeCreate(prototype);
	    Ctor.prototype = prototype;
	    var result = new Ctor;
	    Ctor.prototype = null;
	    return result;
	  };
	
	  var property = function(key) {
	    return function(obj) {
	      return obj == null ? void 0 : obj[key];
	    };
	  };
	
	  // Helper for collection methods to determine whether a collection
	  // should be iterated as an array or as an object
	  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
	  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
	  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
	  var getLength = property('length');
	  var isArrayLike = function(collection) {
	    var length = getLength(collection);
	    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
	  };
	
	  // Collection Functions
	  // --------------------
	
	  // The cornerstone, an `each` implementation, aka `forEach`.
	  // Handles raw objects in addition to array-likes. Treats all
	  // sparse array-likes as if they were dense.
	  _.each = _.forEach = function(obj, iteratee, context) {
	    iteratee = optimizeCb(iteratee, context);
	    var i, length;
	    if (isArrayLike(obj)) {
	      for (i = 0, length = obj.length; i < length; i++) {
	        iteratee(obj[i], i, obj);
	      }
	    } else {
	      var keys = _.keys(obj);
	      for (i = 0, length = keys.length; i < length; i++) {
	        iteratee(obj[keys[i]], keys[i], obj);
	      }
	    }
	    return obj;
	  };
	
	  // Return the results of applying the iteratee to each element.
	  _.map = _.collect = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length,
	        results = Array(length);
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      results[index] = iteratee(obj[currentKey], currentKey, obj);
	    }
	    return results;
	  };
	
	  // Create a reducing function iterating left or right.
	  function createReduce(dir) {
	    // Optimized iterator function as using arguments.length
	    // in the main function will deoptimize the, see #1991.
	    function iterator(obj, iteratee, memo, keys, index, length) {
	      for (; index >= 0 && index < length; index += dir) {
	        var currentKey = keys ? keys[index] : index;
	        memo = iteratee(memo, obj[currentKey], currentKey, obj);
	      }
	      return memo;
	    }
	
	    return function(obj, iteratee, memo, context) {
	      iteratee = optimizeCb(iteratee, context, 4);
	      var keys = !isArrayLike(obj) && _.keys(obj),
	          length = (keys || obj).length,
	          index = dir > 0 ? 0 : length - 1;
	      // Determine the initial value if none is provided.
	      if (arguments.length < 3) {
	        memo = obj[keys ? keys[index] : index];
	        index += dir;
	      }
	      return iterator(obj, iteratee, memo, keys, index, length);
	    };
	  }
	
	  // **Reduce** builds up a single result from a list of values, aka `inject`,
	  // or `foldl`.
	  _.reduce = _.foldl = _.inject = createReduce(1);
	
	  // The right-associative version of reduce, also known as `foldr`.
	  _.reduceRight = _.foldr = createReduce(-1);
	
	  // Return the first value which passes a truth test. Aliased as `detect`.
	  _.find = _.detect = function(obj, predicate, context) {
	    var key;
	    if (isArrayLike(obj)) {
	      key = _.findIndex(obj, predicate, context);
	    } else {
	      key = _.findKey(obj, predicate, context);
	    }
	    if (key !== void 0 && key !== -1) return obj[key];
	  };
	
	  // Return all the elements that pass a truth test.
	  // Aliased as `select`.
	  _.filter = _.select = function(obj, predicate, context) {
	    var results = [];
	    predicate = cb(predicate, context);
	    _.each(obj, function(value, index, list) {
	      if (predicate(value, index, list)) results.push(value);
	    });
	    return results;
	  };
	
	  // Return all the elements for which a truth test fails.
	  _.reject = function(obj, predicate, context) {
	    return _.filter(obj, _.negate(cb(predicate)), context);
	  };
	
	  // Determine whether all of the elements match a truth test.
	  // Aliased as `all`.
	  _.every = _.all = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (!predicate(obj[currentKey], currentKey, obj)) return false;
	    }
	    return true;
	  };
	
	  // Determine if at least one element in the object matches a truth test.
	  // Aliased as `any`.
	  _.some = _.any = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (predicate(obj[currentKey], currentKey, obj)) return true;
	    }
	    return false;
	  };
	
	  // Determine if the array or object contains a given item (using `===`).
	  // Aliased as `includes` and `include`.
	  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
	    if (!isArrayLike(obj)) obj = _.values(obj);
	    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
	    return _.indexOf(obj, item, fromIndex) >= 0;
	  };
	
	  // Invoke a method (with arguments) on every item in a collection.
	  _.invoke = function(obj, method) {
	    var args = slice.call(arguments, 2);
	    var isFunc = _.isFunction(method);
	    return _.map(obj, function(value) {
	      var func = isFunc ? method : value[method];
	      return func == null ? func : func.apply(value, args);
	    });
	  };
	
	  // Convenience version of a common use case of `map`: fetching a property.
	  _.pluck = function(obj, key) {
	    return _.map(obj, _.property(key));
	  };
	
	  // Convenience version of a common use case of `filter`: selecting only objects
	  // containing specific `key:value` pairs.
	  _.where = function(obj, attrs) {
	    return _.filter(obj, _.matcher(attrs));
	  };
	
	  // Convenience version of a common use case of `find`: getting the first object
	  // containing specific `key:value` pairs.
	  _.findWhere = function(obj, attrs) {
	    return _.find(obj, _.matcher(attrs));
	  };
	
	  // Return the maximum element (or element-based computation).
	  _.max = function(obj, iteratee, context) {
	    var result = -Infinity, lastComputed = -Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value > result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };
	
	  // Return the minimum element (or element-based computation).
	  _.min = function(obj, iteratee, context) {
	    var result = Infinity, lastComputed = Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value < result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed < lastComputed || computed === Infinity && result === Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };
	
	  // Shuffle a collection, using the modern version of the
	  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
	  _.shuffle = function(obj) {
	    var set = isArrayLike(obj) ? obj : _.values(obj);
	    var length = set.length;
	    var shuffled = Array(length);
	    for (var index = 0, rand; index < length; index++) {
	      rand = _.random(0, index);
	      if (rand !== index) shuffled[index] = shuffled[rand];
	      shuffled[rand] = set[index];
	    }
	    return shuffled;
	  };
	
	  // Sample **n** random values from a collection.
	  // If **n** is not specified, returns a single random element.
	  // The internal `guard` argument allows it to work with `map`.
	  _.sample = function(obj, n, guard) {
	    if (n == null || guard) {
	      if (!isArrayLike(obj)) obj = _.values(obj);
	      return obj[_.random(obj.length - 1)];
	    }
	    return _.shuffle(obj).slice(0, Math.max(0, n));
	  };
	
	  // Sort the object's values by a criterion produced by an iteratee.
	  _.sortBy = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    return _.pluck(_.map(obj, function(value, index, list) {
	      return {
	        value: value,
	        index: index,
	        criteria: iteratee(value, index, list)
	      };
	    }).sort(function(left, right) {
	      var a = left.criteria;
	      var b = right.criteria;
	      if (a !== b) {
	        if (a > b || a === void 0) return 1;
	        if (a < b || b === void 0) return -1;
	      }
	      return left.index - right.index;
	    }), 'value');
	  };
	
	  // An internal function used for aggregate "group by" operations.
	  var group = function(behavior) {
	    return function(obj, iteratee, context) {
	      var result = {};
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index) {
	        var key = iteratee(value, index, obj);
	        behavior(result, value, key);
	      });
	      return result;
	    };
	  };
	
	  // Groups the object's values by a criterion. Pass either a string attribute
	  // to group by, or a function that returns the criterion.
	  _.groupBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
	  });
	
	  // Indexes the object's values by a criterion, similar to `groupBy`, but for
	  // when you know that your index values will be unique.
	  _.indexBy = group(function(result, value, key) {
	    result[key] = value;
	  });
	
	  // Counts instances of an object that group by a certain criterion. Pass
	  // either a string attribute to count by, or a function that returns the
	  // criterion.
	  _.countBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key]++; else result[key] = 1;
	  });
	
	  // Safely create a real, live array from anything iterable.
	  _.toArray = function(obj) {
	    if (!obj) return [];
	    if (_.isArray(obj)) return slice.call(obj);
	    if (isArrayLike(obj)) return _.map(obj, _.identity);
	    return _.values(obj);
	  };
	
	  // Return the number of elements in an object.
	  _.size = function(obj) {
	    if (obj == null) return 0;
	    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
	  };
	
	  // Split a collection into two arrays: one whose elements all satisfy the given
	  // predicate, and one whose elements all do not satisfy the predicate.
	  _.partition = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var pass = [], fail = [];
	    _.each(obj, function(value, key, obj) {
	      (predicate(value, key, obj) ? pass : fail).push(value);
	    });
	    return [pass, fail];
	  };
	
	  // Array Functions
	  // ---------------
	
	  // Get the first element of an array. Passing **n** will return the first N
	  // values in the array. Aliased as `head` and `take`. The **guard** check
	  // allows it to work with `_.map`.
	  _.first = _.head = _.take = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[0];
	    return _.initial(array, array.length - n);
	  };
	
	  // Returns everything but the last entry of the array. Especially useful on
	  // the arguments object. Passing **n** will return all the values in
	  // the array, excluding the last N.
	  _.initial = function(array, n, guard) {
	    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
	  };
	
	  // Get the last element of an array. Passing **n** will return the last N
	  // values in the array.
	  _.last = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[array.length - 1];
	    return _.rest(array, Math.max(0, array.length - n));
	  };
	
	  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
	  // Especially useful on the arguments object. Passing an **n** will return
	  // the rest N values in the array.
	  _.rest = _.tail = _.drop = function(array, n, guard) {
	    return slice.call(array, n == null || guard ? 1 : n);
	  };
	
	  // Trim out all falsy values from an array.
	  _.compact = function(array) {
	    return _.filter(array, _.identity);
	  };
	
	  // Internal implementation of a recursive `flatten` function.
	  var flatten = function(input, shallow, strict, startIndex) {
	    var output = [], idx = 0;
	    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
	      var value = input[i];
	      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
	        //flatten current level of array or arguments object
	        if (!shallow) value = flatten(value, shallow, strict);
	        var j = 0, len = value.length;
	        output.length += len;
	        while (j < len) {
	          output[idx++] = value[j++];
	        }
	      } else if (!strict) {
	        output[idx++] = value;
	      }
	    }
	    return output;
	  };
	
	  // Flatten out an array, either recursively (by default), or just one level.
	  _.flatten = function(array, shallow) {
	    return flatten(array, shallow, false);
	  };
	
	  // Return a version of the array that does not contain the specified value(s).
	  _.without = function(array) {
	    return _.difference(array, slice.call(arguments, 1));
	  };
	
	  // Produce a duplicate-free version of the array. If the array has already
	  // been sorted, you have the option of using a faster algorithm.
	  // Aliased as `unique`.
	  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
	    if (!_.isBoolean(isSorted)) {
	      context = iteratee;
	      iteratee = isSorted;
	      isSorted = false;
	    }
	    if (iteratee != null) iteratee = cb(iteratee, context);
	    var result = [];
	    var seen = [];
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var value = array[i],
	          computed = iteratee ? iteratee(value, i, array) : value;
	      if (isSorted) {
	        if (!i || seen !== computed) result.push(value);
	        seen = computed;
	      } else if (iteratee) {
	        if (!_.contains(seen, computed)) {
	          seen.push(computed);
	          result.push(value);
	        }
	      } else if (!_.contains(result, value)) {
	        result.push(value);
	      }
	    }
	    return result;
	  };
	
	  // Produce an array that contains the union: each distinct element from all of
	  // the passed-in arrays.
	  _.union = function() {
	    return _.uniq(flatten(arguments, true, true));
	  };
	
	  // Produce an array that contains every item shared between all the
	  // passed-in arrays.
	  _.intersection = function(array) {
	    var result = [];
	    var argsLength = arguments.length;
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var item = array[i];
	      if (_.contains(result, item)) continue;
	      for (var j = 1; j < argsLength; j++) {
	        if (!_.contains(arguments[j], item)) break;
	      }
	      if (j === argsLength) result.push(item);
	    }
	    return result;
	  };
	
	  // Take the difference between one array and a number of other arrays.
	  // Only the elements present in just the first array will remain.
	  _.difference = function(array) {
	    var rest = flatten(arguments, true, true, 1);
	    return _.filter(array, function(value){
	      return !_.contains(rest, value);
	    });
	  };
	
	  // Zip together multiple lists into a single array -- elements that share
	  // an index go together.
	  _.zip = function() {
	    return _.unzip(arguments);
	  };
	
	  // Complement of _.zip. Unzip accepts an array of arrays and groups
	  // each array's elements on shared indices
	  _.unzip = function(array) {
	    var length = array && _.max(array, getLength).length || 0;
	    var result = Array(length);
	
	    for (var index = 0; index < length; index++) {
	      result[index] = _.pluck(array, index);
	    }
	    return result;
	  };
	
	  // Converts lists into objects. Pass either a single array of `[key, value]`
	  // pairs, or two parallel arrays of the same length -- one of keys, and one of
	  // the corresponding values.
	  _.object = function(list, values) {
	    var result = {};
	    for (var i = 0, length = getLength(list); i < length; i++) {
	      if (values) {
	        result[list[i]] = values[i];
	      } else {
	        result[list[i][0]] = list[i][1];
	      }
	    }
	    return result;
	  };
	
	  // Generator function to create the findIndex and findLastIndex functions
	  function createPredicateIndexFinder(dir) {
	    return function(array, predicate, context) {
	      predicate = cb(predicate, context);
	      var length = getLength(array);
	      var index = dir > 0 ? 0 : length - 1;
	      for (; index >= 0 && index < length; index += dir) {
	        if (predicate(array[index], index, array)) return index;
	      }
	      return -1;
	    };
	  }
	
	  // Returns the first index on an array-like that passes a predicate test
	  _.findIndex = createPredicateIndexFinder(1);
	  _.findLastIndex = createPredicateIndexFinder(-1);
	
	  // Use a comparator function to figure out the smallest index at which
	  // an object should be inserted so as to maintain order. Uses binary search.
	  _.sortedIndex = function(array, obj, iteratee, context) {
	    iteratee = cb(iteratee, context, 1);
	    var value = iteratee(obj);
	    var low = 0, high = getLength(array);
	    while (low < high) {
	      var mid = Math.floor((low + high) / 2);
	      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
	    }
	    return low;
	  };
	
	  // Generator function to create the indexOf and lastIndexOf functions
	  function createIndexFinder(dir, predicateFind, sortedIndex) {
	    return function(array, item, idx) {
	      var i = 0, length = getLength(array);
	      if (typeof idx == 'number') {
	        if (dir > 0) {
	            i = idx >= 0 ? idx : Math.max(idx + length, i);
	        } else {
	            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
	        }
	      } else if (sortedIndex && idx && length) {
	        idx = sortedIndex(array, item);
	        return array[idx] === item ? idx : -1;
	      }
	      if (item !== item) {
	        idx = predicateFind(slice.call(array, i, length), _.isNaN);
	        return idx >= 0 ? idx + i : -1;
	      }
	      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
	        if (array[idx] === item) return idx;
	      }
	      return -1;
	    };
	  }
	
	  // Return the position of the first occurrence of an item in an array,
	  // or -1 if the item is not included in the array.
	  // If the array is large and already in sort order, pass `true`
	  // for **isSorted** to use binary search.
	  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
	  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);
	
	  // Generate an integer Array containing an arithmetic progression. A port of
	  // the native Python `range()` function. See
	  // [the Python documentation](http://docs.python.org/library/functions.html#range).
	  _.range = function(start, stop, step) {
	    if (stop == null) {
	      stop = start || 0;
	      start = 0;
	    }
	    step = step || 1;
	
	    var length = Math.max(Math.ceil((stop - start) / step), 0);
	    var range = Array(length);
	
	    for (var idx = 0; idx < length; idx++, start += step) {
	      range[idx] = start;
	    }
	
	    return range;
	  };
	
	  // Function (ahem) Functions
	  // ------------------
	
	  // Determines whether to execute a function as a constructor
	  // or a normal function with the provided arguments
	  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
	    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
	    var self = baseCreate(sourceFunc.prototype);
	    var result = sourceFunc.apply(self, args);
	    if (_.isObject(result)) return result;
	    return self;
	  };
	
	  // Create a function bound to a given object (assigning `this`, and arguments,
	  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
	  // available.
	  _.bind = function(func, context) {
	    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
	    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
	    var args = slice.call(arguments, 2);
	    var bound = function() {
	      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
	    };
	    return bound;
	  };
	
	  // Partially apply a function by creating a version that has had some of its
	  // arguments pre-filled, without changing its dynamic `this` context. _ acts
	  // as a placeholder, allowing any combination of arguments to be pre-filled.
	  _.partial = function(func) {
	    var boundArgs = slice.call(arguments, 1);
	    var bound = function() {
	      var position = 0, length = boundArgs.length;
	      var args = Array(length);
	      for (var i = 0; i < length; i++) {
	        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
	      }
	      while (position < arguments.length) args.push(arguments[position++]);
	      return executeBound(func, bound, this, this, args);
	    };
	    return bound;
	  };
	
	  // Bind a number of an object's methods to that object. Remaining arguments
	  // are the method names to be bound. Useful for ensuring that all callbacks
	  // defined on an object belong to it.
	  _.bindAll = function(obj) {
	    var i, length = arguments.length, key;
	    if (length <= 1) throw new Error('bindAll must be passed function names');
	    for (i = 1; i < length; i++) {
	      key = arguments[i];
	      obj[key] = _.bind(obj[key], obj);
	    }
	    return obj;
	  };
	
	  // Memoize an expensive function by storing its results.
	  _.memoize = function(func, hasher) {
	    var memoize = function(key) {
	      var cache = memoize.cache;
	      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
	      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
	      return cache[address];
	    };
	    memoize.cache = {};
	    return memoize;
	  };
	
	  // Delays a function for the given number of milliseconds, and then calls
	  // it with the arguments supplied.
	  _.delay = function(func, wait) {
	    var args = slice.call(arguments, 2);
	    return setTimeout(function(){
	      return func.apply(null, args);
	    }, wait);
	  };
	
	  // Defers a function, scheduling it to run after the current call stack has
	  // cleared.
	  _.defer = _.partial(_.delay, _, 1);
	
	  // Returns a function, that, when invoked, will only be triggered at most once
	  // during a given window of time. Normally, the throttled function will run
	  // as much as it can, without ever going more than once per `wait` duration;
	  // but if you'd like to disable the execution on the leading edge, pass
	  // `{leading: false}`. To disable execution on the trailing edge, ditto.
	  _.throttle = function(func, wait, options) {
	    var context, args, result;
	    var timeout = null;
	    var previous = 0;
	    if (!options) options = {};
	    var later = function() {
	      previous = options.leading === false ? 0 : _.now();
	      timeout = null;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    };
	    return function() {
	      var now = _.now();
	      if (!previous && options.leading === false) previous = now;
	      var remaining = wait - (now - previous);
	      context = this;
	      args = arguments;
	      if (remaining <= 0 || remaining > wait) {
	        if (timeout) {
	          clearTimeout(timeout);
	          timeout = null;
	        }
	        previous = now;
	        result = func.apply(context, args);
	        if (!timeout) context = args = null;
	      } else if (!timeout && options.trailing !== false) {
	        timeout = setTimeout(later, remaining);
	      }
	      return result;
	    };
	  };
	
	  // Returns a function, that, as long as it continues to be invoked, will not
	  // be triggered. The function will be called after it stops being called for
	  // N milliseconds. If `immediate` is passed, trigger the function on the
	  // leading edge, instead of the trailing.
	  _.debounce = function(func, wait, immediate) {
	    var timeout, args, context, timestamp, result;
	
	    var later = function() {
	      var last = _.now() - timestamp;
	
	      if (last < wait && last >= 0) {
	        timeout = setTimeout(later, wait - last);
	      } else {
	        timeout = null;
	        if (!immediate) {
	          result = func.apply(context, args);
	          if (!timeout) context = args = null;
	        }
	      }
	    };
	
	    return function() {
	      context = this;
	      args = arguments;
	      timestamp = _.now();
	      var callNow = immediate && !timeout;
	      if (!timeout) timeout = setTimeout(later, wait);
	      if (callNow) {
	        result = func.apply(context, args);
	        context = args = null;
	      }
	
	      return result;
	    };
	  };
	
	  // Returns the first function passed as an argument to the second,
	  // allowing you to adjust arguments, run code before and after, and
	  // conditionally execute the original function.
	  _.wrap = function(func, wrapper) {
	    return _.partial(wrapper, func);
	  };
	
	  // Returns a negated version of the passed-in predicate.
	  _.negate = function(predicate) {
	    return function() {
	      return !predicate.apply(this, arguments);
	    };
	  };
	
	  // Returns a function that is the composition of a list of functions, each
	  // consuming the return value of the function that follows.
	  _.compose = function() {
	    var args = arguments;
	    var start = args.length - 1;
	    return function() {
	      var i = start;
	      var result = args[start].apply(this, arguments);
	      while (i--) result = args[i].call(this, result);
	      return result;
	    };
	  };
	
	  // Returns a function that will only be executed on and after the Nth call.
	  _.after = function(times, func) {
	    return function() {
	      if (--times < 1) {
	        return func.apply(this, arguments);
	      }
	    };
	  };
	
	  // Returns a function that will only be executed up to (but not including) the Nth call.
	  _.before = function(times, func) {
	    var memo;
	    return function() {
	      if (--times > 0) {
	        memo = func.apply(this, arguments);
	      }
	      if (times <= 1) func = null;
	      return memo;
	    };
	  };
	
	  // Returns a function that will be executed at most one time, no matter how
	  // often you call it. Useful for lazy initialization.
	  _.once = _.partial(_.before, 2);
	
	  // Object Functions
	  // ----------------
	
	  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
	  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
	  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
	                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];
	
	  function collectNonEnumProps(obj, keys) {
	    var nonEnumIdx = nonEnumerableProps.length;
	    var constructor = obj.constructor;
	    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;
	
	    // Constructor is a special case.
	    var prop = 'constructor';
	    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);
	
	    while (nonEnumIdx--) {
	      prop = nonEnumerableProps[nonEnumIdx];
	      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
	        keys.push(prop);
	      }
	    }
	  }
	
	  // Retrieve the names of an object's own properties.
	  // Delegates to **ECMAScript 5**'s native `Object.keys`
	  _.keys = function(obj) {
	    if (!_.isObject(obj)) return [];
	    if (nativeKeys) return nativeKeys(obj);
	    var keys = [];
	    for (var key in obj) if (_.has(obj, key)) keys.push(key);
	    // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };
	
	  // Retrieve all the property names of an object.
	  _.allKeys = function(obj) {
	    if (!_.isObject(obj)) return [];
	    var keys = [];
	    for (var key in obj) keys.push(key);
	    // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };
	
	  // Retrieve the values of an object's properties.
	  _.values = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var values = Array(length);
	    for (var i = 0; i < length; i++) {
	      values[i] = obj[keys[i]];
	    }
	    return values;
	  };
	
	  // Returns the results of applying the iteratee to each element of the object
	  // In contrast to _.map it returns an object
	  _.mapObject = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys =  _.keys(obj),
	          length = keys.length,
	          results = {},
	          currentKey;
	      for (var index = 0; index < length; index++) {
	        currentKey = keys[index];
	        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
	      }
	      return results;
	  };
	
	  // Convert an object into a list of `[key, value]` pairs.
	  _.pairs = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var pairs = Array(length);
	    for (var i = 0; i < length; i++) {
	      pairs[i] = [keys[i], obj[keys[i]]];
	    }
	    return pairs;
	  };
	
	  // Invert the keys and values of an object. The values must be serializable.
	  _.invert = function(obj) {
	    var result = {};
	    var keys = _.keys(obj);
	    for (var i = 0, length = keys.length; i < length; i++) {
	      result[obj[keys[i]]] = keys[i];
	    }
	    return result;
	  };
	
	  // Return a sorted list of the function names available on the object.
	  // Aliased as `methods`
	  _.functions = _.methods = function(obj) {
	    var names = [];
	    for (var key in obj) {
	      if (_.isFunction(obj[key])) names.push(key);
	    }
	    return names.sort();
	  };
	
	  // Extend a given object with all the properties in passed-in object(s).
	  _.extend = createAssigner(_.allKeys);
	
	  // Assigns a given object with all the own properties in the passed-in object(s)
	  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
	  _.extendOwn = _.assign = createAssigner(_.keys);
	
	  // Returns the first key on an object that passes a predicate test
	  _.findKey = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = _.keys(obj), key;
	    for (var i = 0, length = keys.length; i < length; i++) {
	      key = keys[i];
	      if (predicate(obj[key], key, obj)) return key;
	    }
	  };
	
	  // Return a copy of the object only containing the whitelisted properties.
	  _.pick = function(object, oiteratee, context) {
	    var result = {}, obj = object, iteratee, keys;
	    if (obj == null) return result;
	    if (_.isFunction(oiteratee)) {
	      keys = _.allKeys(obj);
	      iteratee = optimizeCb(oiteratee, context);
	    } else {
	      keys = flatten(arguments, false, false, 1);
	      iteratee = function(value, key, obj) { return key in obj; };
	      obj = Object(obj);
	    }
	    for (var i = 0, length = keys.length; i < length; i++) {
	      var key = keys[i];
	      var value = obj[key];
	      if (iteratee(value, key, obj)) result[key] = value;
	    }
	    return result;
	  };
	
	   // Return a copy of the object without the blacklisted properties.
	  _.omit = function(obj, iteratee, context) {
	    if (_.isFunction(iteratee)) {
	      iteratee = _.negate(iteratee);
	    } else {
	      var keys = _.map(flatten(arguments, false, false, 1), String);
	      iteratee = function(value, key) {
	        return !_.contains(keys, key);
	      };
	    }
	    return _.pick(obj, iteratee, context);
	  };
	
	  // Fill in a given object with default properties.
	  _.defaults = createAssigner(_.allKeys, true);
	
	  // Creates an object that inherits from the given prototype object.
	  // If additional properties are provided then they will be added to the
	  // created object.
	  _.create = function(prototype, props) {
	    var result = baseCreate(prototype);
	    if (props) _.extendOwn(result, props);
	    return result;
	  };
	
	  // Create a (shallow-cloned) duplicate of an object.
	  _.clone = function(obj) {
	    if (!_.isObject(obj)) return obj;
	    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
	  };
	
	  // Invokes interceptor with the obj, and then returns obj.
	  // The primary purpose of this method is to "tap into" a method chain, in
	  // order to perform operations on intermediate results within the chain.
	  _.tap = function(obj, interceptor) {
	    interceptor(obj);
	    return obj;
	  };
	
	  // Returns whether an object has a given set of `key:value` pairs.
	  _.isMatch = function(object, attrs) {
	    var keys = _.keys(attrs), length = keys.length;
	    if (object == null) return !length;
	    var obj = Object(object);
	    for (var i = 0; i < length; i++) {
	      var key = keys[i];
	      if (attrs[key] !== obj[key] || !(key in obj)) return false;
	    }
	    return true;
	  };
	
	
	  // Internal recursive comparison function for `isEqual`.
	  var eq = function(a, b, aStack, bStack) {
	    // Identical objects are equal. `0 === -0`, but they aren't identical.
	    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
	    if (a === b) return a !== 0 || 1 / a === 1 / b;
	    // A strict comparison is necessary because `null == undefined`.
	    if (a == null || b == null) return a === b;
	    // Unwrap any wrapped objects.
	    if (a instanceof _) a = a._wrapped;
	    if (b instanceof _) b = b._wrapped;
	    // Compare `[[Class]]` names.
	    var className = toString.call(a);
	    if (className !== toString.call(b)) return false;
	    switch (className) {
	      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
	      case '[object RegExp]':
	      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
	      case '[object String]':
	        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
	        // equivalent to `new String("5")`.
	        return '' + a === '' + b;
	      case '[object Number]':
	        // `NaN`s are equivalent, but non-reflexive.
	        // Object(NaN) is equivalent to NaN
	        if (+a !== +a) return +b !== +b;
	        // An `egal` comparison is performed for other numeric values.
	        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
	      case '[object Date]':
	      case '[object Boolean]':
	        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
	        // millisecond representations. Note that invalid dates with millisecond representations
	        // of `NaN` are not equivalent.
	        return +a === +b;
	    }
	
	    var areArrays = className === '[object Array]';
	    if (!areArrays) {
	      if (typeof a != 'object' || typeof b != 'object') return false;
	
	      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
	      // from different frames are.
	      var aCtor = a.constructor, bCtor = b.constructor;
	      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
	                               _.isFunction(bCtor) && bCtor instanceof bCtor)
	                          && ('constructor' in a && 'constructor' in b)) {
	        return false;
	      }
	    }
	    // Assume equality for cyclic structures. The algorithm for detecting cyclic
	    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
	
	    // Initializing stack of traversed objects.
	    // It's done here since we only need them for objects and arrays comparison.
	    aStack = aStack || [];
	    bStack = bStack || [];
	    var length = aStack.length;
	    while (length--) {
	      // Linear search. Performance is inversely proportional to the number of
	      // unique nested structures.
	      if (aStack[length] === a) return bStack[length] === b;
	    }
	
	    // Add the first object to the stack of traversed objects.
	    aStack.push(a);
	    bStack.push(b);
	
	    // Recursively compare objects and arrays.
	    if (areArrays) {
	      // Compare array lengths to determine if a deep comparison is necessary.
	      length = a.length;
	      if (length !== b.length) return false;
	      // Deep compare the contents, ignoring non-numeric properties.
	      while (length--) {
	        if (!eq(a[length], b[length], aStack, bStack)) return false;
	      }
	    } else {
	      // Deep compare objects.
	      var keys = _.keys(a), key;
	      length = keys.length;
	      // Ensure that both objects contain the same number of properties before comparing deep equality.
	      if (_.keys(b).length !== length) return false;
	      while (length--) {
	        // Deep compare each member
	        key = keys[length];
	        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
	      }
	    }
	    // Remove the first object from the stack of traversed objects.
	    aStack.pop();
	    bStack.pop();
	    return true;
	  };
	
	  // Perform a deep comparison to check if two objects are equal.
	  _.isEqual = function(a, b) {
	    return eq(a, b);
	  };
	
	  // Is a given array, string, or object empty?
	  // An "empty" object has no enumerable own-properties.
	  _.isEmpty = function(obj) {
	    if (obj == null) return true;
	    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
	    return _.keys(obj).length === 0;
	  };
	
	  // Is a given value a DOM element?
	  _.isElement = function(obj) {
	    return !!(obj && obj.nodeType === 1);
	  };
	
	  // Is a given value an array?
	  // Delegates to ECMA5's native Array.isArray
	  _.isArray = nativeIsArray || function(obj) {
	    return toString.call(obj) === '[object Array]';
	  };
	
	  // Is a given variable an object?
	  _.isObject = function(obj) {
	    var type = typeof obj;
	    return type === 'function' || type === 'object' && !!obj;
	  };
	
	  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
	  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
	    _['is' + name] = function(obj) {
	      return toString.call(obj) === '[object ' + name + ']';
	    };
	  });
	
	  // Define a fallback version of the method in browsers (ahem, IE < 9), where
	  // there isn't any inspectable "Arguments" type.
	  if (!_.isArguments(arguments)) {
	    _.isArguments = function(obj) {
	      return _.has(obj, 'callee');
	    };
	  }
	
	  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
	  // IE 11 (#1621), and in Safari 8 (#1929).
	  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
	    _.isFunction = function(obj) {
	      return typeof obj == 'function' || false;
	    };
	  }
	
	  // Is a given object a finite number?
	  _.isFinite = function(obj) {
	    return isFinite(obj) && !isNaN(parseFloat(obj));
	  };
	
	  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
	  _.isNaN = function(obj) {
	    return _.isNumber(obj) && obj !== +obj;
	  };
	
	  // Is a given value a boolean?
	  _.isBoolean = function(obj) {
	    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
	  };
	
	  // Is a given value equal to null?
	  _.isNull = function(obj) {
	    return obj === null;
	  };
	
	  // Is a given variable undefined?
	  _.isUndefined = function(obj) {
	    return obj === void 0;
	  };
	
	  // Shortcut function for checking if an object has a given property directly
	  // on itself (in other words, not on a prototype).
	  _.has = function(obj, key) {
	    return obj != null && hasOwnProperty.call(obj, key);
	  };
	
	  // Utility Functions
	  // -----------------
	
	  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
	  // previous owner. Returns a reference to the Underscore object.
	  _.noConflict = function() {
	    root._ = previousUnderscore;
	    return this;
	  };
	
	  // Keep the identity function around for default iteratees.
	  _.identity = function(value) {
	    return value;
	  };
	
	  // Predicate-generating functions. Often useful outside of Underscore.
	  _.constant = function(value) {
	    return function() {
	      return value;
	    };
	  };
	
	  _.noop = function(){};
	
	  _.property = property;
	
	  // Generates a function for a given object that returns a given property.
	  _.propertyOf = function(obj) {
	    return obj == null ? function(){} : function(key) {
	      return obj[key];
	    };
	  };
	
	  // Returns a predicate for checking whether an object has a given set of
	  // `key:value` pairs.
	  _.matcher = _.matches = function(attrs) {
	    attrs = _.extendOwn({}, attrs);
	    return function(obj) {
	      return _.isMatch(obj, attrs);
	    };
	  };
	
	  // Run a function **n** times.
	  _.times = function(n, iteratee, context) {
	    var accum = Array(Math.max(0, n));
	    iteratee = optimizeCb(iteratee, context, 1);
	    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
	    return accum;
	  };
	
	  // Return a random integer between min and max (inclusive).
	  _.random = function(min, max) {
	    if (max == null) {
	      max = min;
	      min = 0;
	    }
	    return min + Math.floor(Math.random() * (max - min + 1));
	  };
	
	  // A (possibly faster) way to get the current timestamp as an integer.
	  _.now = Date.now || function() {
	    return new Date().getTime();
	  };
	
	   // List of HTML entities for escaping.
	  var escapeMap = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    "'": '&#x27;',
	    '`': '&#x60;'
	  };
	  var unescapeMap = _.invert(escapeMap);
	
	  // Functions for escaping and unescaping strings to/from HTML interpolation.
	  var createEscaper = function(map) {
	    var escaper = function(match) {
	      return map[match];
	    };
	    // Regexes for identifying a key that needs to be escaped
	    var source = '(?:' + _.keys(map).join('|') + ')';
	    var testRegexp = RegExp(source);
	    var replaceRegexp = RegExp(source, 'g');
	    return function(string) {
	      string = string == null ? '' : '' + string;
	      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
	    };
	  };
	  _.escape = createEscaper(escapeMap);
	  _.unescape = createEscaper(unescapeMap);
	
	  // If the value of the named `property` is a function then invoke it with the
	  // `object` as context; otherwise, return it.
	  _.result = function(object, property, fallback) {
	    var value = object == null ? void 0 : object[property];
	    if (value === void 0) {
	      value = fallback;
	    }
	    return _.isFunction(value) ? value.call(object) : value;
	  };
	
	  // Generate a unique integer id (unique within the entire client session).
	  // Useful for temporary DOM ids.
	  var idCounter = 0;
	  _.uniqueId = function(prefix) {
	    var id = ++idCounter + '';
	    return prefix ? prefix + id : id;
	  };
	
	  // By default, Underscore uses ERB-style template delimiters, change the
	  // following template settings to use alternative delimiters.
	  _.templateSettings = {
	    evaluate    : /<%([\s\S]+?)%>/g,
	    interpolate : /<%=([\s\S]+?)%>/g,
	    escape      : /<%-([\s\S]+?)%>/g
	  };
	
	  // When customizing `templateSettings`, if you don't want to define an
	  // interpolation, evaluation or escaping regex, we need one that is
	  // guaranteed not to match.
	  var noMatch = /(.)^/;
	
	  // Certain characters need to be escaped so that they can be put into a
	  // string literal.
	  var escapes = {
	    "'":      "'",
	    '\\':     '\\',
	    '\r':     'r',
	    '\n':     'n',
	    '\u2028': 'u2028',
	    '\u2029': 'u2029'
	  };
	
	  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;
	
	  var escapeChar = function(match) {
	    return '\\' + escapes[match];
	  };
	
	  // JavaScript micro-templating, similar to John Resig's implementation.
	  // Underscore templating handles arbitrary delimiters, preserves whitespace,
	  // and correctly escapes quotes within interpolated code.
	  // NB: `oldSettings` only exists for backwards compatibility.
	  _.template = function(text, settings, oldSettings) {
	    if (!settings && oldSettings) settings = oldSettings;
	    settings = _.defaults({}, settings, _.templateSettings);
	
	    // Combine delimiters into one regular expression via alternation.
	    var matcher = RegExp([
	      (settings.escape || noMatch).source,
	      (settings.interpolate || noMatch).source,
	      (settings.evaluate || noMatch).source
	    ].join('|') + '|$', 'g');
	
	    // Compile the template source, escaping string literals appropriately.
	    var index = 0;
	    var source = "__p+='";
	    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
	      source += text.slice(index, offset).replace(escaper, escapeChar);
	      index = offset + match.length;
	
	      if (escape) {
	        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
	      } else if (interpolate) {
	        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
	      } else if (evaluate) {
	        source += "';\n" + evaluate + "\n__p+='";
	      }
	
	      // Adobe VMs need the match returned to produce the correct offest.
	      return match;
	    });
	    source += "';\n";
	
	    // If a variable is not specified, place data values in local scope.
	    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';
	
	    source = "var __t,__p='',__j=Array.prototype.join," +
	      "print=function(){__p+=__j.call(arguments,'');};\n" +
	      source + 'return __p;\n';
	
	    try {
	      var render = new Function(settings.variable || 'obj', '_', source);
	    } catch (e) {
	      e.source = source;
	      throw e;
	    }
	
	    var template = function(data) {
	      return render.call(this, data, _);
	    };
	
	    // Provide the compiled source as a convenience for precompilation.
	    var argument = settings.variable || 'obj';
	    template.source = 'function(' + argument + '){\n' + source + '}';
	
	    return template;
	  };
	
	  // Add a "chain" function. Start chaining a wrapped Underscore object.
	  _.chain = function(obj) {
	    var instance = _(obj);
	    instance._chain = true;
	    return instance;
	  };
	
	  // OOP
	  // ---------------
	  // If Underscore is called as a function, it returns a wrapped object that
	  // can be used OO-style. This wrapper holds altered versions of all the
	  // underscore functions. Wrapped objects may be chained.
	
	  // Helper function to continue chaining intermediate results.
	  var result = function(instance, obj) {
	    return instance._chain ? _(obj).chain() : obj;
	  };
	
	  // Add your own custom functions to the Underscore object.
	  _.mixin = function(obj) {
	    _.each(_.functions(obj), function(name) {
	      var func = _[name] = obj[name];
	      _.prototype[name] = function() {
	        var args = [this._wrapped];
	        push.apply(args, arguments);
	        return result(this, func.apply(_, args));
	      };
	    });
	  };
	
	  // Add all of the Underscore functions to the wrapper object.
	  _.mixin(_);
	
	  // Add all mutator Array functions to the wrapper.
	  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      var obj = this._wrapped;
	      method.apply(obj, arguments);
	      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
	      return result(this, obj);
	    };
	  });
	
	  // Add all accessor Array functions to the wrapper.
	  _.each(['concat', 'join', 'slice'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      return result(this, method.apply(this._wrapped, arguments));
	    };
	  });
	
	  // Extracts the result from a wrapped and chained object.
	  _.prototype.value = function() {
	    return this._wrapped;
	  };
	
	  // Provide unwrapping proxy for some methods used in engine operations
	  // such as arithmetic and JSON stringification.
	  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;
	
	  _.prototype.toString = function() {
	    return '' + this._wrapped;
	  };
	
	  // AMD registration happens at the end for compatibility with AMD loaders
	  // that may not enforce next-turn semantics on modules. Even though general
	  // practice for AMD registration is to be anonymous, underscore registers
	  // as a named module because, like jQuery, it is a base library that is
	  // popular enough to be bundled in a third party lib, but not be part of
	  // an AMD load request. Those cases could generate an error when an
	  // anonymous define() is called outside of a loader request.
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return _;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	}.call(this));


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map