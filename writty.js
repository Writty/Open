window.onload = function () {
    trigger();
    setupEventListenerForThemeSwitch();
    initialCheckForTheme()
};
// Styling: Headings, Bold, Italic, Underline, Quotes, Lists //

document.querySelectorAll('[data-edit]').forEach(btn =>
    btn.addEventListener('click', edit)
);

function edit(ev) {
    ev.preventDefault();
    const cmd_val = this.getAttribute('data-edit').split(':');
    document.execCommand(cmd_val[0], false, cmd_val[1]);
}

// Functions: Links and Images //

const btns = document.querySelectorAll('[data-edt]');

function Space(aID) {

    return document.getElementById(aID);
}

function trigger() {
    let space = document.getElementById('content');
    space.designMode = 'on';
    space.addEventListener('mouseup', agent);
    space.addEventListener('keyup', agent);


//Buttons Commands //

    for (let b of btns) {
        b.addEventListener('click', () => {
            run(b.dataset.edt, b, b.dataset.param);
            document.getElementById('content').focus();
            document.getElementById('content').focus();
        });
    }

}

// Insert Link //

function run(cmd, ele, value = null) {
    let status = document.execCommand(cmd, false, value);
    if (!status) {
        switch (cmd) {
            case 'insertLink':
                value = prompt('Enter url');
                if (value.slice(0, 4) != 'http') {
                    value = 'http://' + value;
                }
                document.execCommand('createLink', false, value);

                // Overrides inherited attribute "contenteditable" from parent
                // which would otherwise prevent anchor tag from being interacted with.
                atag = document.getSelection().focusNode.parentNode;
                atag.setAttribute("contenteditable", "false");

                break;
        }
    }
}

// Insert Image //

if (window.File && window.FileList && window.FileReader) {
    const filesInput = document.getElementById("imageUpload");

    filesInput.addEventListener("change", function (event) {

        const files = event.target.files; //FileList object
        const output = document.getElementById("content");

        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            //Only pics
            if (!file.type.match('image'))
                continue;

            const picReader = new FileReader();

            picReader.addEventListener("load", (event) => {

                const picSrc = event.target.result;

                const imgThumbnailElem = "<div class='imgView'><img  src='" + picSrc + "'" +
                    "title='" + file.name + "'/><h5 text-align: center;>Caption</h5></div>";

                output.innerHTML = output.innerHTML + imgThumbnailElem;

            });

            //Read the image
            picReader.readAsDataURL(file);
        }

    });
} else {
    alert("Your browser does not support File API");
}


// Word Counter //

function agent() {
    document.getElementById('counter').innerText = document.getElementById('content').innerText.length;
}

// Theme Switch //

function setupEventListenerForThemeSwitch() {
    const themeSwitch = document.getElementById("theme-switch");
    themeSwitch.addEventListener("click", function() {
        toggleThemePreference();
    });
}

// Print //

function printPDF() {
    const printContent = document.getElementById('content').innerHTML;
    window.print();

}

function downloadContent(type) {
    let editorContent = ''
    if (type === 'txt') {
        editorContent = document.getElementById('content').textContent;
    } else {
        editorContent =`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Writty</title>
        </head>
            <body>
                ${document.getElementById('content').innerHTML}
            </body>
        </html>
        `
    }

    const linkElement = document.createElement("a")
    linkElement.setAttribute("download", `writty.${type}`)
    linkElement.setAttribute("href", 'data:text/plain;charset=utf-8,' + encodeURIComponent(editorContent))
    linkElement.click()

    document.body.removeChild(linkElement);
}

// Toggle RTL //

function toggleRTL() {
    const editorElement = document.querySelector("#editor")
    const currentDir = editorElement.getAttribute("dir")
    if (!currentDir || currentDir === "ltr") {
        editorElement.setAttribute("dir", "rtl")
    } else {
        editorElement.setAttribute("dir", "ltr")
    }
}

// Check for theme //

function initialCheckForTheme() {
    // Default to light-theme
    let themePreference = "light-theme";    


    // Local storage is used to override OS theme settings
    if(localStorage.getItem("theme-preference")){
        if(localStorage.getItem("theme-preference") === "dark-theme"){
            themePreference = "dark-theme";
        }
    } else if(!window.matchMedia) {
        // matchMedia method not supported
        return false;
    } else if(window.matchMedia("(prefers-color-scheme: dark)").matches) {
        // OS theme setting detected as dark
        themePreference = "dark-theme";
    }

    if (themePreference === "dark-theme") {
        const themeSwitch = document.getElementById("theme-switch");
        themeSwitch.checked = true;
    }

    localStorage.setItem("theme-preference", themePreference);
    document.body.classList.add(themePreference);
}

// Toggle current theme //

function toggleThemePreference() {
    let currentThemePreference = localStorage.getItem("theme-preference");

    switch(currentThemePreference) {
        case "light-theme":
            localStorage.setItem("theme-preference", "dark-theme");

            document.body.classList.remove("light-theme");
            document.body.classList.add("dark-theme");
            break;
        case "dark-theme":
            localStorage.setItem("theme-preference", "light-theme");

            document.body.classList.remove("dark-theme");
            document.body.classList.add("light-theme");
            break;
      }
}

// Paste plain text //

const ce = document.querySelector('[contenteditable]');
ce.addEventListener('paste', function (e) {
  e.preventDefault();
  const text = e.clipboardData.getData('text/plain');
  document.execCommand('insertText', false, text);
});