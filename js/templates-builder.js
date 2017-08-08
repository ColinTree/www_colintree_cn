/**
 * Templates repository utility app developed by Ralph Morelli (ram8647@gmail.com).  
 *
 * Copyright 2013 R. Morelli
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * A form prompts the user to upload the various elements that make up a
 * templates repository that has the following structure.

 templates/
 templates/templates.json 

 templates/HelloPurr/
 templates/HelloPurr/android_mobileCSP-128.jpg  
 templates/HelloPurr/kitty.png  
 templates/HelloPurr/HelloPurr.zip    
 templates/HelloPurr/HelloPurr.asc   
 *
 * The app then downloads a zip file that the user can unzip in their
 * documnt root.
 */


/**
 * @fileoverview Creates a templates repository for App Inventor.
 * @author ram8647@gmail.com (Ralph Morelli)
 */

// Global associative  arrays for templates and their images and their zip files.
var templates;   
var images;
var zips;

var TEMPLATES_JSON = '#TEMPLATE#';   

function init() {
  templates = new Array();   // Associative array of templates
  images = new Array();      // Associative array of images
  zips = new Array();       // Assocative array of zip files
}

/**
 * Provides a preview of the template on the web page.
 * 
 * @param template, an object representing a template entry.
 */
function displayPreviewFromTemplate(template) {
  var preview = document.getElementById('preview');
  preview.innerHTML = '<h3>' + template.name + '</h3>' +
    '<h4>' + template.subtitle + '</h4>'; //  +
  
  var thumbImg = images[template.thumbnail];
  if (thumbImg) { 
    preview.innerHTML += '<p style="width:250px"><img width="32px" src="' + thumbImg.bytes + '"</img>' + template.description + '</p>';
  } else {
    preview.innerHTML += '<p style="width:250px"><img width="32px" src="http://dummyimage.com/32x32"</img>' + template.description + '</p>';
  }

  var screenImg = images[template.screenshot];
  if (screenImg) {
    preview.innerHTML += '<img width="250px" src="' + screenImg.bytes + '"</img>';
  } else {
    preview.innerHTML += '<img width="250px" src="http://dummyimage.com/250x300" </img>';
  }
  var prevtable = document.getElementById('previewtable');
  prevtable.style.visibility="visible";
}

/**
 * Display's a preview from the editor -- i.e., from the doc's
 *  input elements.
 */
function displayPreviewFromEditor() {
  var preview = document.getElementById('preview');

  // Clean the name
  var name = clean(document.getElementById("name").value);
  document.getElementById("name").value = name;

  preview.innerHTML = '<h3>' + document.getElementById("name").value + '</h3>' +
    '<h4>' + document.getElementById("subtitle").value + '</h4>'; //  +

  var thumbhtml = document.getElementById('thumbimg').innerHTML;
  var screenhtml = document.getElementById('screenimg').innerHTML;
  var description = document.getElementById("desc").value;

  if (thumbhtml != "") {
    preview.innerHTML += '<p style="width:250px">' + thumbhtml + description + '</p>';
  } else {
    preview.innerHTML += '<img width="250px" src="http://dummyimage.com/32x32" </img>';
  }

  if (screenhtml != "") {
    preview.innerHTML += screenhtml.replace("64","250");
  } else {
    preview.innerHTML += '<img width="250px" src="http://dummyimage.com/250x300" </img>';
  }
  var prevtable = document.getElementById('previewtable');
  prevtable.style.visibility="visible";
}

/**
 *  Saves the template into the templates array.
 */
function saveTemplate() {
  var name = clean(document.getElementById("name").value);
  if (name == "") {
    alert("You must give your template a name.");
    return;
  }
  document.getElementById("name").value = name;
  var template;
  var json;
  if (templates[name]) {
    template = templates[name];
    fillInFields(template);
    json = JSON.stringify(template);
    updateSelect(template.name, json);
  } else {
    template = new Object();
    fillInFields(template);
    json = JSON.stringify(template);
    addToSelect(template.name, json);
    document.getElementById("delete").disabled=false;
  }
  templates[name] = template;
  //  resetForm();
  displayPreviewFromTemplate(template);
  //  alert(json);
} 

/**
 * Fills the template from the doc's input fields.
 * 
 * @param template an empty template to be filled in.
 */
function fillInFields(template) {
  template.name = document.getElementById("name").value;
  template.subtitle = document.getElementById("subtitle").value;
  template.description = document.getElementById("desc").value;
  var path = document.getElementById("thumbnail").value;
  template.thumbnail = path.substring(path.lastIndexOf('\\') + 1);  //Removes C:\fakepath\
  path = document.getElementById("screenshot").value;
  template.screenshot = path.substring(path.lastIndexOf('\\') + 1);  //Removes C:\fakepath\
  // By default the value has a name like C:\fakepath\File.zip
  var fakepath = document.getElementById("zip").value;
  template.zip = fakepath.substring(fakepath.lastIndexOf('\\') + 1);
}

/**
 * Adds a name/value option pair to the form's select drop down menu.
 * 
 * @param name, the name of a template.
 * @param value, the json string for the template.
 */
function addToSelect(name, value) {
  var select = document.getElementById("templates");
  select.options[select.options.length] = new Option(name, value);
}

/**
 * Updates the name/value option pair in the form's select menu.
 * 
 * @param name, the name of a template.
 * @param value, the json string for the template.
 */
function updateSelect(name, value) {
  var select = document.getElementById("templates");
  var options = select.options;
  for (var i=0; i < options.length; i++) {
    if (options[i].innerHTML == name) {
      options[i].value = value;
      return;
    }
  }
}

/**
 * Displays a template given its json string.
 * 
 * @param json, a Json string representing a template.
 */
function displayTemplate(json) {
  var template = JSON.parse(json);
  document.getElementById("name").value = template.name;  
  document.getElementById("subtitle").value = template.subtitle;  
  document.getElementById("desc").value = template.description;  

  // Display the images here
  var thumbImg = images[template.thumbnail];
  if (thumbImg) { 
    document.getElementById('thumbimg').innerHTML = '<img width="64px" src="' + thumbImg.bytes + '"</img>';
  } else {
    document.getElementById('thumbimg').innerHTML = '<img width="64px" src="http://dummyimage.com/64x64"</img>';
  }

  var screenImg = images[template.screenshot];
  if (screenImg) { 
    document.getElementById('screenimg').innerHTML = '<img width="64px" src="' + screenImg.bytes + '"</img>';
  } else {
    document.getElementById('screenimg').innerHTML = '<img width="64px" src="http://dummyimage.com/64x64"</img>';
  }

  document.getElementById("zip").value = template.zip;  
  document.getElementById("delete").disabled=false;
  displayPreviewFromTemplate(template);
}

/**
 * Completely resets the form, losing all data in the form elements.
 */
function resetForm() {
  document.getElementById("templateform").reset();
  document.getElementById("delete").disabled=true;
  document.getElementById("previewtable").style.visibility="hidden";
  document.getElementById("thumbimg").style.visibility="hidden";
  document.getElementById("screenimg").style.visibility="hidden";
  document.getElementById('thumbimg').innerHTML = "";
  document.getElementById('screenimg').innerHTML = "";
}

/**
 * Deletes  the template currently selected, removing its data
 *  from templates array.
 */
function deleteTemplate() {
  var select = document.getElementById('templates');
  var n = select.selectedIndex;
  var name = select.options[select.selectedIndex].innerHTML;
  templates[name]  = null;
  select.remove(n); 
  resetForm();
  thumbnailImg = null;
  screenshotImg = null;
  alert("templates " + templates.length);
}


/**
 * Handles the uploading of a file.
 *
 * @param fileinput a form input element, either thumb, screenshot, or zip,
 *  that contains the file's id as input by the user.
 * 
 * @see http://www.html5rocks.com/en/tutorials/file/dndfiles/
 * @see http://hacks.mozilla.org/2011/01/how-to-develop-a-html5-image-uploader/
 */
function handleFileSelect(fileinput) {
  var files = fileinput.files;
  var f = files[0];
  var reader = new FileReader();
  var thumbnailImg;
  var screenshotImg;
  var zipdata;

  // Closure to capture the file information.
  reader.onload = (function(theFile) {
      return function(e) {
	// Render thumbnail.
	if (fileinput.id=="thumbnail") {
	  if (!f.type.match(/image.*/)) {
	    window.alert(f.name + " does not appear to be an image file.");
	    return;
	  };
	  thumbnailImg = e.target.result;
	  var image = new Object();
	  image.filename = f.name;
	  image.bytes = thumbnailImg;
	  images[f.name] = image;
	  var img = document.getElementById('thumbimg');
	  img.innerHTML = '<img style="width:32" src="' + thumbnailImg + '"/>';        
	  document.getElementById('thumbimg').style.visibility="visible";
	} else if (fileinput.id=="screenshot") {
	  if (!f.type.match(/image.*/)) {
	    window.alert(f.name + " does not appear to be an image file.");
	    return;
	  };
	  screenshotImg = e.target.result;
	  var image = new Object();
	  image.filename = f.name;
	  image.bytes = screenshotImg;
	  images[f.name] = image;
	  var img = document.getElementById('screenimg');
	  img.innerHTML = '<img style="width:64" src="' + screenshotImg + '"/>';        
	  document.getElementById('screenimg').style.visibility="visible";
	} else if (fileinput.id=="zip") {
	  zipdata = e.target.result;
	  var zip = new Object();
	  zip.filename = f.name;
	  zip.bytes = zipdata;
	  zips[f.name] = zip;
	}
      };
    })(f);

  // Read in the image file as a data URL.
  reader.readAsDataURL(f);
}

/**
 * Scales an image to a desired width and height.
 *
 * @param imgdata the images bytes.
 * @param maxwidth the desired width.
 * @param maxheight the desired width.
 *
 * NOTE: This is not yet working properly.
 */
function scale(imgdata, maxWidth, maxHeight) {
  var img = document.createElement("img");
  img.src = imgdata;
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img,0,0);
  var width = img.width;
  var height = img.height;

  if (width > height) {
    if (width > maxWidth) {
      height *= maxWidth / width;
      width = maxWidth;
    }
  } else {
    if (height > maxHeight) {
      width *= maxHeight / height;
      height = maxHeight;
    }
  }
  canvas.width = width;
  canvas.height = height;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, width, height);

  return canvas.toDataURL("image/png");
}

/**
 * Generates the Json representation of the repository.
 * 
 * @return, the Json string that goes into templates.json file
 *  in the templates/ folder.
 */
function generateTemplatesJsonString() {
  var jsonStr = '[' ;

  for (var key in templates) {
    console.log("Adding template for key = " + key);
    jsonStr += JSON.stringify(templates[key]);
    jsonStr += ',';
  }
  
  jsonStr += ']';
  console.log(jsonStr);
  return jsonStr;
}

/**
 * Removes special characters from a string.
 *
 * @param the string to be cleaned.
 * @return the cleaned string.
 */

function clean(str) {
  return str.replace(/[\s`~!@#$%^&*()_|+\-=?;:,.<>\{\}\[\]\\\/\'\"\"]/gi, '');
}


/**
 * Creates the templates.zip file from the data input by 
 *  they user.
 *
 * NOTE: The name of the downloaded zip will vary depending on the browser:
 * 
 *   chrome: download.zip
 *   firfox: X_CfnpA9.zip  -- a weird base64 name, different each time.
 *   safari: Not yet supported.
 *   ie:  Don't know
 */
function createZip() {
  console.log("Creating the zip file");
  var zip = new JSZip();

  // Create the templates folder its contents
  var json = generateTemplatesJsonString();
  var templateJson = TEMPLATES_JSON.replace("#TEMPLATE#", json);
  zip.folder("templates").file("templates.json", templateJson);

  for (var key in templates) {
    var template = templates[key];
    var tname = template.name;
    zip.folder("templates").folder(tname);
    if (template.thumbnail != "")  {
      var data = images[template.thumbnail].bytes;
      data = data.substring(data.indexOf(',') + 1); // Strip off data:image/png;base64
      zip.folder("templates").folder(tname).file(template.thumbnail, data, {base64: true});
    }
    if (template.screenshot != "") {
      var data = images[template.screenshot].bytes;
      data = data.substring(data.indexOf(',') + 1); // Strip off data:image/png;base64
      zip.folder("templates").folder(tname).file(template.screenshot, data, {base64: true});
    }
    // The zip file must be named <project>.zip where <project> is the project name
    if (template.zip != "") {
      var data = zips[template.zip].bytes;
      data = data.substring(data.indexOf(',') + 1); // Strip off data:image/png;base64
      var ascii = Base64.encode(data);
      zip.folder("templates").folder(tname).file(tname + ".zip", data, {base64: true});
      zip.folder("templates").folder(tname).file(tname + ".asc", ascii, {base64: true});
    }
  }
 
  // Generate the zip as base64
  var base64zip = zip.generate();

  // Download it to the user's system
  // NOTE: This will produce a weird file name in some cases
  console.log('Downloading');
  location.href="data:application/zip;base64," + base64zip;
}


/**
 *
 *  Base64 encode / decode
 *  @see http://www.webtoolkit.info/
 *
 **/
var Base64 = {

  // private property
  _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

  // public method for encoding
  encode : function (input) {
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;

    input = Base64._utf8_encode(input);

    while (i < input.length) {

      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);

      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;

      if (isNaN(chr2)) {
	enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
	enc4 = 64;
      }

      output = output +
        this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
        this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

    }

    return output;
  },

  // public method for decoding
  decode : function (input) {
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;

    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    while (i < input.length) {

      enc1 = this._keyStr.indexOf(input.charAt(i++));
      enc2 = this._keyStr.indexOf(input.charAt(i++));
      enc3 = this._keyStr.indexOf(input.charAt(i++));
      enc4 = this._keyStr.indexOf(input.charAt(i++));

      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;

      output = output + String.fromCharCode(chr1);

      if (enc3 != 64) {
	output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
	output = output + String.fromCharCode(chr3);
      }

    }

    output = Base64._utf8_decode(output);

    return output;

  },

  // private method for UTF-8 encoding
  _utf8_encode : function (string) {
    string = string.replace(/\r\n/g,"\n");
    var utftext = "";

    for (var n = 0; n < string.length; n++) {

      var c = string.charCodeAt(n);

      if (c < 128) {
	utftext += String.fromCharCode(c);
      }
      else if((c > 127) && (c < 2048)) {
	utftext += String.fromCharCode((c >> 6) | 192);
	utftext += String.fromCharCode((c & 63) | 128);
      }
      else {
	utftext += String.fromCharCode((c >> 12) | 224);
	utftext += String.fromCharCode(((c >> 6) & 63) | 128);
	utftext += String.fromCharCode((c & 63) | 128);
      }

    }

    return utftext;
  },

  // private method for UTF-8 decoding
  _utf8_decode : function (utftext) {
    var string = "";
    var i = 0;
    var c = c1 = c2 = 0;

    while ( i < utftext.length ) {

      c = utftext.charCodeAt(i);

      if (c < 128) {
	string += String.fromCharCode(c);
	i++;
      }
      else if((c > 191) && (c < 224)) {
	c2 = utftext.charCodeAt(i+1);
	string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
	i += 2;
      }
      else {
	c2 = utftext.charCodeAt(i+1);
	c3 = utftext.charCodeAt(i+2);
	string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
	i += 3;
      }

    }

    return string;
  }

}

