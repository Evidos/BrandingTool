function changeColor(classidentifier:string, properties:Array<string>, inputid:string){
    var inputfield = <HTMLInputElement>document.getElementById(inputid);
    var colorcode = inputfield.value;

    if (!validateHexColorCode(colorcode)) {
        inputfield.parentElement.classList.add("has-error");
    } else {
        inputfield.parentElement.classList.remove("has-error");
    }

        var brandingitems = document.getElementsByClassName(classidentifier);
        for (var item in brandingitems) {
            if (brandingitems.hasOwnProperty(item)) {
                var brandingitem = <HTMLElement>brandingitems[item];
                
                properties.forEach(prop => {
                    brandingitem.style.setProperty(prop, colorcode);
                });
            }
        }
}

function validateHexColorCode(colorcode){
    return /^$|#([a-f]|[A-F]|[0-9]){3}(([a-f]|[A-F]|[0-9]){3})?\b/.test(colorcode);
}

function changeimg(classidentifier:string,inputid:string) {
    var input = <HTMLInputElement>document.getElementById(inputid);
    var files = input.files;

    if (FileReader && files && files.length) {
        var fr = new FileReader();
        fr.onload = function () {
            var imageElement = <HTMLImageElement>document.getElementById(classidentifier)
            imageElement.src = fr.result;
        }
        fr.readAsDataURL(files[0]);
    }
}