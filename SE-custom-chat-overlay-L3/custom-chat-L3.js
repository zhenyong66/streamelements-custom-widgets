@import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css');
@import url('https://fonts.googleapis.com/css?family={{fontName}}');

* {
    font-family: '{{fontName}}', sans-serif;
    color: {{fontColor}};
    overflow: hidden;
    font-weight: {{fontWeight}};
    text-shadow:{textShadow};
}

.main-container{
    display:{{alignMessages}};
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    align-content: flex-start;
    height:98%;
    margin-bottom:10px;
    box-sizing: border-box;
  /*background-color: greenyellow;*/
}

.message-row{
    flex: 0 0 auto;
    width:fit-content;
    margin-bottom:0px;
    background-color:{{backgroundColor}};
    padding:5px;
    vertical-align: baseline;
  max-width: 100%;
  overflow: visible;
}

.badge{
    display:{{displayBadges}};
    height:{{fontSize}}px;
  vertical-align: middle;
}

.user-box{
    display:block;
    font-size:{{fontSize}}px;
  border: 10px solid pink;
  border-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAAA1CAYAAAANvwQjAAAACXBIWXMAAAsSAAALEgHS3X78AAABf0lEQVR4nO3YwU3jQBSA4YcbIJLvZjuADnZKoAMoJXRACUsHKWHogO0g+O4DFRgNMlFWWRS/c75P8iHyXPLkX+Px1TzPcWyqw2NEtOt3wGX6iIhdRGz7Mu6PJ3AIZqrDr2XRrYcEDp76Mm6/f3wFM9VhExGtpGtzghMvfRnbW1d0y52dWOBHD1Md7tvNbqpDcV6Bs55j2WEezQrOupnqcNeCuTMrWKV0vorBapvOrGA9wUCCYCBBMJAgGEgQDCQIBhIEAwmCgQTBQIJgIEEwkCAYSBAMJAgGEgQDCYKBBMFAgmAgQTCQIBhIEAwkCAYSBAMJgoEEwUCCYCBBMJAgGEgQDCQIBhIEAwmCgQTBQIJgIEEwkCAYSGjBvBsYrNOCeTMrWKW2YHZmBWd99GWsXV/GP17L4KznODr037eCzAz+67Uv4za+g+nL2M4xRTRw4nXZUL5czfN8WDDVYbNsPW3Btdlxwf62FpYjy8E/wRyb6lA8LVyofV/G/clfj4hPcPFF3qVnkcAAAAAASUVORK5CYII=) 10 fill;
  width: fit-content;
  max-width: 100%;
  transform: rotate(-5deg);
  transform-origin: bottom left;
  margin-bottom: -10px;
  animation-name: animation;
  animation-duration: 2s;
  animation-timing-function: linear;
}

@keyframes animation {
  0% {transform: rotate(-5deg); transform-origin: bottom left;}
  50% {transform: rotate(-15deg); transform-origin: bottom left;}
  100% {transform: rotate(-5deg); transform-origin: bottom left;}
}

.user-box > span{
    font-size:{{fontSize}}px;
}

.user-message{
    display:block;
    font-size:{{fontSize}}px;
    word-wrap: break-word;
  	border: 10px solid pink;
    border-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAcsAAABOCAYAAABPCD2YAAAACXBIWXMAAAsSAAALEgHS3X78AAADlElEQVR4nO3bP2icZRzA8beXg+RyJpiY6NAU7tIDqYs6KIqCLZjiJNLWWiuIxOLgIFo6VBRrXaqCIIoibSmIIEI0dKm16uAgmJhARLBZQnPSq0MTchBDQsolJ28k4QLR3577fLb3bnp+PPDlef/sqNfrCQDw37Jb/VMqFJ/q69v5+szM7L3Ly8ut5gfAdtfR0VFtbW29ODs7+85UebrcuNxNJ8tSoXh7b2/vz5mWzN3HXnoxO7B/IOnr22mDALDtjY6MJt8MDSffXrp8qy3X9vb4xMSZ9TVvxDINZVd31+/79u3d9eapN5LOzk47A4CmM3l1Mjny9NHVXC73+cj42GD6W2Z9CumJMg3l+x+8J5QANK099+xJvhr6MrO4tPj8Y488+lyyHstSofhCeus1DSUANLs0mKdOv9WysLDwyUYsC8XCK8dPvLblyz4A0IwOHjqQtOXa8ulLr2uxLE+X7x/Y/7jNAAANnjlyOLt7d/8TmVKhWMi152qeUwLAZunt2Llq9aH0ZFno7+9fMB8A2Kyzs2PtOmMuAPD/xBIAAmIJAAGxBICAWAJAQCwBICCWABAQSwAIiCUABMQSAAJiCQABsQSAgFgCQEAsASAglgAQEEsACIglAATEEgACYgkAAbEEgIBYAkBALAEgIJYAEBBLAAiIJQAExBIAAmIJAAGxBICAWAJAQCwBICCWABAQSwAIiCUABMQSAAJiCQABsQSAgFgCQEAsASAglgAQEEsACIglAATEEgACYgkAAbEEgIBYAkBALAEgIJYAEBBLAAiIJQAExBIAAmIJAAGxBICAWAJAQCwBICCWABAQSwAIiCUABMQSAAJiCQCBNJbla9eu3WZQALDZ/Pzfa9eZqfJ0eWlxKTs/P29EANBg8upkkm9v/2PtNmxXd9f1H77/0XwAoMGV766sVCo3htZimW3Jvnvh/IUVAwKAf42OjCbl6T9rU+Xpi2ux/GXs109v3pz566MPPzYiAJpe+mjy+Ksnarn23Omk8W3Y6lz1ybOfnbslmAA0s0rlRvLs4aMr9Xr98vjExJl0FDvq9frGSEqF4n09PT2X7ujpvmvw2GDLwUMHbBgAmkIayeGvh5NzZ8/X8u35L0bGxwbX170plusefuDBl2srtZPVuequQrGwkM/na7YKANtV+gnl6srqSu+dvT9VrldOTpWnf2tc6paxbFQqFPfaHQBsc+X0U8ot15gkyT9W+ta4QoLWiQAAAABJRU5ErkJggg==) 10 fill;
  width: fit-content;
  max-width: 100%;
}

.emote{
    height: {emoteSize}px;
    vertical-align: middle;
    background-repeat:no-repeat;
}

.action{
    font-style: italic;
}