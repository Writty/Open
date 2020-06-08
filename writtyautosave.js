document.addEventListener("DOMContentLoaded", function() { 
    AutoSave.start();
});


const AutoSave = (function () {

    const getEditorElement = () => document.querySelector("#editor")

    let timer = null;

//Save to local storage //

    function save() {
        
        const editorContent = document.getElementById('content').innerHTML;

        if (editorContent) {
            localStorage.setItem('AutoSave' + document.location, editorContent);
        }


        const dir = getEditorElement().getAttribute("dir")
        localStorage.setItem('dirIsRtl', dir === "rtl" );
    }

//Load from local storage //

    function restore() {

        //get the content from local storage
        const savedContent = localStorage.getItem('AutoSave' + document.location);

        //if it found some
        if (savedContent) {
            //grab the editor
            document.getElementById('content').innerHTML =savedContent;

        }

        const dirIsRtl = localStorage.getItem('dirIsRtl');
        getEditorElement().setAttribute("dir", JSON.parse(dirIsRtl) ? "rtl" : "ltr")
    }

    return {

// Start Autosave function triggered in line 2 //

        start: function () {

            const editor = document.getElementById('content');

            if (editor)
                restore();

            if (timer != null) {
                clearInterval(timer);
                timer = null;
            }

            timer = setInterval(save, 2000);
        },

        stop: function () {

            if (timer) {
                clearInterval(timer);
                timer = null;
            }
        }
    };
    


}());

// Clear All //

function clearStorage() {
    if (confirm("Are you sure you want to create a new text? This will erase all the content.")) {
        window.localStorage.clear();
        document.getElementById("content").innerHTML= "<p>Once upon a time...✏️</p>";
        location.reload();
    }
}
