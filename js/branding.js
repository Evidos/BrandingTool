function changeColor(classidentifier, properties, inputid) {
    var inputfield = document.getElementById(inputid);
    var colorcode = inputfield.value;
    if (!validateHexColorCode(colorcode)) {
        inputfield.parentElement.classList.add("has-error");
    }
    else {
        inputfield.parentElement.classList.remove("has-error");
    }
    var brandingitems = document.getElementsByClassName(classidentifier);
    for (var item in brandingitems) {
        if (brandingitems.hasOwnProperty(item)) {
            var brandingitem = brandingitems[item];
            properties.forEach(function (prop) {
                brandingitem.style.setProperty(prop, colorcode);
            });
        }
    }
}

function changeHoverColor(classidentifier, properties, inputid) {
  var inputfield = document.getElementById(inputid);
  var colorcode = inputfield.value;
  if (!validateHexColorCode(colorcode)) {
      inputfield.parentElement.classList.add("has-error");
  }
  else {
      inputfield.parentElement.classList.remove("has-error");
  }
  var brandingitems = document.getElementsByClassName(classidentifier);
  for (var item in brandingitems) {
      if (brandingitems.hasOwnProperty(item)) {
          var brandingitem = brandingitems[item];
          properties.forEach(function (prop) {
            var oldcolor = brandingitem.style.getPropertyValue(prop);
              $(brandingitem).hover(function(){
                $(this).css(prop, colorcode);
              }, function(){
                $(this).css(prop, oldcolor);
              });
          });
      }
  }
}

function validateHexColorCode(colorcode) {
    return /^$|#([a-f]|[A-F]|[0-9]){3}(([a-f]|[A-F]|[0-9]){3})?\b/.test(colorcode);
}
function changeimg(classidentifier, inputid) {
    var input = document.getElementById(inputid);
    var files = input.files;
    if (FileReader && files && files.length) {
        var fr = new FileReader();
        fr.onload = function () {
            var imageElement = document.getElementById(classidentifier);
            imageElement.src = fr.result;
        };
        fr.readAsDataURL(files[0]);
    }
}

function exportToYAML() {
  $('#export-field').text('');

  var icon = $('#iconimg-option').prop('files')[0];
  var logo = $('#logoimg-option').prop('files')[0];

  const icondatapromise = new Promise(function (resolve, reject){
    if (typeof icon == 'undefined') {
      reject();
    }
    var reader = new FileReader();
    reader.readAsDataURL(icon);
    reader.onload = function () {
        resolve(reader.result);
    };
  });

  const logodatapromise = new Promise(function (resolve, reject){
    if (typeof logo == 'undefined') {
      reject();
    }
    var reader = new FileReader();
    reader.readAsDataURL(logo);
    reader.onload = function () {
        resolve(reader.result);
    };
  });

  Promise.all([icondatapromise, logodatapromise]).then(function(values){
    writeExportData(values);
    showExportDiv();
  }).catch(function(){
    writeExportData(['','']);
    showExportDiv();
  });
}

function writeExportData(values) {
  var exportData = [
                    'brand:',
                    '  icon-data: ' + values[0],
                    '  logo-data: ' + values[1],
                    '  foreground-color: \'' + $('#brandforegroundcolor-option').val() + '\'',
                    '  background-color: \'' + $('#brandcolor-option').val()+ '\'',
                    '',
                    'indicator-area:',
                    '  foreground-color: \'' + $('#sidebarforeground-option').val()+ '\'',
                    '  background-color: \'' + $('#sidebar-option').val()+ '\'',
                    '',
                    'content-area',
                    '  foreground-color: \'' + $('#contentforeground-option').val()+ '\'',
                    '  background-color: \'' + $('#docbackground-option').val()+ '\'',
                    '',
                    'navigation-area:',
                    '  foreground-color: \'' + $('#navigationbarforeground-option').val()+ '\'',
                    '  background-color: \'' + $('#navigationbar-option').val()+ '\'',
                    '  primary-foreground-color: \'' + $('#primarytext-option').val()+ '\'',
                    '  primary-background-color: \'' + $('#primary-option').val()+ '\'',
                    '  primary-foreground-color-hover: \'' + $('#primarytexthover-option').val()+ '\'',
                    '  primary-background-color-hover: \'' + $('#primaryhover-option').val()+ '\'',
                    '  secondary-foreground-color: \'' + $('#secondarytext-option').val()+ '\'',
                    '  secondary-background-color: \'' + $('#secondary-option').val()+ '\'',
                    '  secondary-foreground-color-hover: \'' + $('#secondarytexthover-option').val()+ '\'',
                    '  secondary-background-color-hover: \'' + $('#secondaryhover-option').val()+ '\''
                  ].join('\n');

  $('#export-field').text(exportData);
}

function hideExportDiv() {
  $('#export').hide();
}

function showExportDiv() {
  $('#export').show();
}

function copyExport() {
  $('#export-field').select();
  document.execCommand("copy");
}
