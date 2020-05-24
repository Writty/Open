
 $(document).ready(function() {
            AutoSave.start();
        })


var AutoSave = (function () {

    var timer = null;

//Save to local storage //

    function save() {
        
        var editorContent = document.getElementById('content').innerHTML

        if (editorContent) {
            localStorage.setItem('AutoSave' + document.location, editorContent)
        }

    }

//Load from local storage //

    function restore() {

        //get the content from local storage
        var savedContent = localStorage.getItem('AutoSave' + document.location)

        //if it found some
        if (savedContent) {
            //grab the editor
            document.getElementById('content').innerHTML =savedContent;

        }
    }

    return {

// Start Autosave function triggered in line 2 //

        start: function () {

            var editor = document.getElementById('content')

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
    }
    


}())

// Clear All //

        function clearStorage() {
            window.localStorage.clear();
            $('#content').contents().find('html').html();

            if (confirm("Are you sure you want to create a new text? This will erase all the content.")) {
                location.reload();
            }
        }
