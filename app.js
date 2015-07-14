(function () {
    //core methods
    var loadSample = function(sample) {
            $.ajax({
            url: "./examples/" + sample,
            success: function(data) {
                window.editor.selectAll();
                window.editor.insert(data);
            }
        });
    }
    
    var runCode = function() {
        try {
            var code = window.editor.getValue();
            eval(code);
        }
        catch(e) {
            $("#alertBox button").after('<span>There was an error with your code. Check the developer console.</span>');
            $("#alertBox").fadeIn("slow");
            console.log(e);
        }
    }
    
    //event handlers and UI hooks.
    $('#alertBox .close').click(function(e) {
        $("#alertBox span").remove();
        $("#alertBox").hide();
    });    
    
    $('#samples').change(function() {
        loadSample($(this).val());
        window.editor.focus();
    });
    
    $('#runButton').click(function() {
        runCode();
        window.editor.focus();
    })
    
    $('#clearButton').click(function() {
        clear();
        window.editor.focus();
    });
    
    $('#clearCode').click(function() {
        window.editor.setValue('');
        window.editor.focus();
    });
    
    //editor setup
    $(document).ready(function() {
        window.editor = ace.edit("editor");
        window.editor.setTheme("ace/theme/monokai");
        window.editor.$blockScrolling = Infinity;
        window.editor.getSession().setMode("ace/mode/javascript");
        
        //bind a key to auto-run the code
        window.editor.commands.addCommand({
            name: 'execScript',
            bindKey: {win: 'Ctrl-M',  mac: 'Command-M'},
            exec: function(editor) {
                runCode();
            },
            readOnly: true // false if this command should not apply in readOnly mode
        });
        
        loadSample('starter.js');
        
    });
})();
