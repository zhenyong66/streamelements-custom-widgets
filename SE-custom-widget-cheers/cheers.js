let fieldData;

const sound = document.getElementById('sound');

const doCommand = () => {
    sound.play();
}

const handleMessage = (obj) => {
    const cheerCommand = fieldData.cheerCommand;
    const data = obj.detail.event.data;
    const { text } = data;
    const textStartsWithCommand = text.startsWith(cheerCommand);
    if (!textStartsWithCommand) {
        return;
    }
    doCommand();
};

window.addEventListener('onEventReceived', function (obj) {
    if (obj.detail.listener !== "message") {
        return;
    }

    handleMessage(obj);
});

window.addEventListener('onWidgetLoad', function (obj) {
    fieldData = obj.detail.fieldData;
});