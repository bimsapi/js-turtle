(function () {
    var loadSample = function(sample) {
            $.ajax({
            url: "./examples/" + sample,
            success: function(data) {
                window.editor.selectAll();
                window.editor.insert(data);
            }
        });
    }
    
    $('#samples').change(function() {
        loadSample($(this).val());
        window.editor.focus();
    });
    
    $('#runButton').click(function() {
        var code = window.editor.getValue();
        eval(code);
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
    
    $(document).ready(function() {
        window.editor = ace.edit("editor");
        window.editor.setTheme("ace/theme/monokai");
        window.editor.getSession().setMode("ace/mode/javascript");
        window.editor.commands.addCommand({
            name: 'execScript',
            bindKey: {win: 'Ctrl-M',  mac: 'Command-M'},
            exec: function(editor) {
                var code = window.editor.getValue();
                try {
                  // execute any code in the definitions box
                  eval(code);
                } catch(e) {
                  alert('Exception thrown, please see console');
                  throw e;
                } finally {
                }
            },
            readOnly: true // false if this command should not apply in readOnly mode
        });
        
        loadSample('starter.js');
        
    });
})();
