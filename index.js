/* global ngapp, xelib */
let getBodyTemplate = function(record) {
  return xelib.GetElement(record, 'BODT') || xelib.GetElement(record, 'BOD2');
};

registerPatcher({
    info: info,
    gameModes: [xelib.gmTES5, xelib.gmSSE],
    settings: {
        label: 'Khajiit Ears Show'
    },
    requiredFiles: [],
    getFilesToPatch: function(filenames) {
        return filenames;
    },
    execute: {
        process: [{
            load: function(plugin, helpers, settings, locals) {
                return {
                    signature: 'ARMA',
                    filter: function(record) {
                        return /khajiit/i.test(xelib.GetValue(record, 'RNAM'));
                    }
                }
            },
            patch: function(record, helpers, settings, locals) {
                xelib.SetFlag(getBodyTemplate(record), 'First Person Flags', '43 - Ears', false); 
            }
        }]
    }
});