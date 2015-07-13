(function () {
    var loadSample = function(sample) {
            $.ajax({
            url: "/examples/" + sample,
            success: function(data) {
                window.editor.selectAll();
                window.editor.insert(data);
            }
        });
    }
    
    $('#samples').change(function() {
        loadSample($(this).val());
    });
    
    $('#demoButton').click(function(){
        clear();
        var code = window.editor.getValue();
        eval(code);
        demo(); 
    });
    
    $('#clearButton').click(function() {
        clear(); 
    });
    
    $(document).ready(function() {
        window.editor = ace.edit("editor");
        //window.editor.setTheme("ace/theme/solarized_light");
        window.editor.getSession().setMode("ace/mode/javascript");
        window.editor.commands.addCommand({
            name: 'execScript',
            bindKey: {win: 'Ctrl-M',  mac: 'Command-M'},
            exec: function(editor) {
                var definitionsText = window.editor.getValue();
                try {
                  // execute any code in the definitions box
                  eval(definitionsText);
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
