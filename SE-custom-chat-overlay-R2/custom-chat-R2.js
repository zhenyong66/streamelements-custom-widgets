let totalMessages = 0, messagesLimit = 0, nickColor = "user", removeSelector, addition, customNickColor, channelName,
    provider;
let animationIn = 'bounceIn';
let animationOut = 'bounceOut';
let hideAfter = 60;
let hideCommands = "no";
let ignoredUsers = [];

window.addEventListener('onEventReceived', function (obj) {
    if (obj.detail.event.listener === 'widget-button') {

        if (obj.detail.event.field === 'testMessage') {
            let emulated = new CustomEvent("onEventReceived", {
                detail: {
                    listener: "message", event: {
                        service: "twitch",
                        data: {
                            time: Date.now(),
                            tags: {
                                "badge-info": "",
                                badges: "moderator/1,partner/1",
                                color: "#5B99FF",
                                "display-name": "StreamElements",
                                emotes: "25:46-50",
                                flags: "",
                                id: "43285909-412c-4eee-b80d-89f72ba53142",
                                mod: "0",
                                "room-id": "85827806",
                                subscriber: "1",
                                "tmi-sent-ts": "1579444549265",
                                turbo: "0",
                                "user-id": "100135110",
                                "user-type": "mod"
                            },
                            nick: channelName,
                            userId: "100135110",
                            displayName: channelName,
                            displayColor: "#5B99FF",
                            badges: [{
                                type: "moderator",
                                version: "1",
                                url: "https://static-cdn.jtvnw.net/badges/v1/3267646d-33f0-4b17-b3df-f923a41db1d0/3",
                                description: "Moderator"
                            }, {
                                type: "partner",
                                version: "1",
                                url: "https://static-cdn.jtvnw.net/badges/v1/d12a2e27-16f6-41d0-ab77-b780518f00a3/3",
                                description: "Verified"
                            }],
                            channel: channelName,
                            text: "Howdy! My name is Bill and I am here to serve Kappa",
                            isAction: !1,
                            emotes: [{
                                type: "twitch",
                                name: "Kappa",
                                id: "25",
                                gif: !1,
                                urls: {
                                    1: "https://static-cdn.jtvnw.net/emoticons/v1/25/1.0",
                                    2: "https://static-cdn.jtvnw.net/emoticons/v1/25/1.0",
                                    4: "https://static-cdn.jtvnw.net/emoticons/v1/25/3.0"
                                },
                                start: 46,
                                end: 50
                            }],
                            msgId: "43285909-412c-4eee-b80d-89f72ba53142"
                        },
                        renderedText: 'Howdy! My name is Bill and I am here to serve <img src="https://static-cdn.jtvnw.net/emoticons/v1/25/1.0" srcset="https://static-cdn.jtvnw.net/emoticons/v1/25/1.0 1x, https://static-cdn.jtvnw.net/emoticons/v1/25/1.0 2x, https://static-cdn.jtvnw.net/emoticons/v1/25/3.0 4x" title="Kappa" class="emote">'
                    }
                }
            });
            window.dispatchEvent(emulated);
        }
        return;
    }
    if (obj.detail.listener === "delete-message") {
        const msgId = obj.detail.event.msgId;
        $(`.message-row[data-msgid=${msgId}]`).remove();
        return;
    }
    else if (obj.detail.listener === "delete-messages") {
        const sender = obj.detail.event.userId;
        $(`.message-row[data-sender=${sender}]`).remove();
        return;
    }

    if (obj.detail.listener !== "message") return;
    let data = obj.detail.event.data;
    if (data.text.startsWith("!") && hideCommands === "yes") return;
    if (ignoredUsers.indexOf(data.nick) !== -1) return;
    let message = attachEmotes(data);
    let badges = "", badge;
    if (provider === 'mixer') {
        data.badges.push({ url: data.avatar });
    }
    for (let i = 0; i < data.badges.length; i++) {
        badge = data.badges[i];
        badges += `<img alt="" src="${badge.url}" class="badge ${badge.type}-icon"> `;
    }
    /*let username = data.displayName + ":";*/
  let username = data.displayName;
    if (nickColor === "user") {
        const color = data.displayColor !== "" ? data.displayColor : "#" + (md5(username).slice(26));
        username = `<span style="color:${color}">${username}</span>`;
    }
    else if (nickColor === "custom") {
        const color = customNickColor;
        username = `<span style="color:${color}">${username}</span>`;
    }
    else if (nickColor === "remove") {
        username = '';
    }
    addMessage(username, badges, message, data.isAction, data.userId, data.msgId);
	addImg(data.tags);  
});

function addImg(tags) {
  let userBox = document.querySelectorAll(".user-box");
  let userMsg = document.querySelectorAll(".user-message");
  let img = document.createElement("img");
  img.classList.add("img");
  userMsg[userMsg.length-1].appendChild(img); 
  
  if (tags.mod == 1) {
    userBox[userBox.length-1].classList.add("mod-box");
    userMsg[userMsg.length-1].classList.add("mod-msg");
    img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAhCAYAAAC803lsAAAACXBIWXMAAAsSAAALEgHS3X78AAAEBklEQVRYhcWYb0wTdxjHn/YqLdc/x5V2tIPAdXRjhqRrUKIJ+4OZGuKML+aIhv2LZn/cEhK2V2bxxV6YwYvJXDQLLkZjossyjCbGAG4sGokDowUEDWx0tvxRutCsUtretXfllqejG5t35ehK933ZX/v0c9/f83ue53cqURQhGzkZRxFFG9pjUa6JTwha2mK6EQqG3/D6ff5s4qmzogAAI6W/OB+K7NvZVK9tOfwmxNlEHanXDSJgNvGycsTJOOq1uoIf2s58pLHY6NRnsQgLRw6eEWbuB46M3Bs7uNqYWTlipPRHd+x98S8IFGkohNfe2a7heaElG1dWDeJkHO5EnK9uaKx7bG29+ylwVJURlNnYtOYgVru5Dd1AB6SErgi88NmagjgZBxMORV6WciMtdKWUKdFvqHF9uGYgVru5I5MbaWXjikbJl5aSD09KRjfSSrviql7fFotyHUpqyz+OLx5LAGDMVsotiuJGQkPYgoFQZWqtupzbtMWla2h8Xgk7jA3fh/MnvxcmJx5CnEtoaIvpN4FPBowUOfBwam4cAIYBwJ+GTIHgfrJR7ovikqKkvdxaWOF8Eqw2Gix2GiqcdlhpK5SCxRZYmPTOQjAQgtnpOc57b0pnsdHfDAwMvq6qrGDqdYUFvYeOHyAQIJ/CIni4+UQyusAeV1ts9LsvvVKbdwhYKoK7928j1IR6p9pIkXwswuUdIi38b4JQa9S+nx98ervvrog2/R+63uOBomLTqVSybt5cc66Q1O45dOx9IheJqVRft3bCcP/49NCdu+WpgoZZGwnHujBx8uVMGmJhPuqC5ZX11u07u/IFsxzC6/c9gn+X+HzASEGA3GBUu/G5SwYTuePj1reJ5TPHfxE+2InWTpgYnXwMAuSa3t/OdCzmyomzxy7LQsiCoELBcHtxCZ0zEHTWSJFdUhAZQUi9rsFRVaqoOysR9qxohJPtmLIgehPpzlV+oLCBCrxQtmoQURSdFU/nrv9gL4susNSqQXAOQTtzKXu5lV2aeZSB4KSu1RUIuS73OOsAgFtqTS4ZGcezZSsmKtaGC6d7Ux301X1bYaWcwu2Z8s7WKgYxW6l6nDszAfR03oCub68LJtrwY1JIjt+8OvLBpi2ugkxAuNW9bKJaMQgXi3M4zskBdH/Xt7hunWY0ziVa+vs91+DP7Tw69NPY5309nt0vNGyQdCjT3CNZ4vH+AgC+T758D9LO9HV7oPPkFUGlUv36+9z8Aa/fd00qIP4Wrx14/8GrB079mGv4YFipBWGx2TM48pUiEBQO1LEI2178RBEfmAkajJQey/NbcgBSQLTFdDYUDNcxz5Q+8v/yAF9jnPYMje5X7MiyYHifwSwflivNCoBWjgEAfwDtqPDw2Nf07gAAAABJRU5ErkJggg=="; 
  }
  else if (tags.subscriber == 1) {
    userBox[userBox.length-1].classList.add("sub-box");
    userMsg[userMsg.length-1].classList.add("sub-msg");
    img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAAkCAYAAAAU/hMoAAAACXBIWXMAAAsSAAALEgHS3X78AAADlklEQVRYhc2YXUhTYRzGX0+bztSlOFNUbNOFBWZC2sdNSCFSN4lddKGWXkTOQlLCkr6WhVqQkpTaTUoqdBNMuogSQgjyE/Ojm0jZhLLMj83jznKbH/EMnTm3nZOes+25Opz3ef/8zgP//znn9VtZWSFsUsoVobLIqG7/gAAJq5mjLGazprun6yoXNyfI1ENpL/YlpxRk5RbwAsjQNLlfosKlYlSn1W0bUilXyAkh2qa3nSQyOpYXSKitoY68edUyNDA4kMLmpdgM0tAwTU5hMa+AUFZuPrFaLQeUckUWm9ctJAqgEAryraAQKSm8focKlu5q3hYkCqAQCgqhjDNnyZ6EvUEHk5KrtwSJjSiAQkIq70qJyGq1lmCC/BckNmAjCghKSAhJTj1Cjmee9g+P2P3SlccpJDZgIwp4QjmqYsIY508p5Qqnnb4JEkZswEZPCZPj7IWLojBZRCsnSBixge+RwyZMEIqiEtNSDxe5hYQBRiFGDpswQYrK1SKrxVLp2ER2SFuzWCyVMAo1cth07ESGbSTJIqPUTiGxAAOM3pSq/K6INhhUq6/jdUjcwAIMXiUkhMQn7l8bSfYmskFGxcQ2YgEGX9ClslvExBiPKuWKdBskLgyzMyex4CtCT+RdLtkhDQ2zDXgqOk5ek5l9zmvN4kr4dg2QSGKUckU+NTc7836ot2vJpwgJIcP9PWROr18khGiooS/DN6Z+TtAd7a99AG1dLU9rF8Vice2oTmuwNQ5jnM9ufFixzMzTPgGIwMbHvjEIkKx196hO2ykW+49oWlm/PwUXgkJgRnrO/tqzD3PaoM9qa6wjkxPfvQqJoBDYqE6rWbtnh8RfW2i4rOn5owdeA0RACAqB/Xt/wweGYWa6dODTRzM6yxtCQAjK8Td3AyQ6SRIYeO/xzWvLnmZEMAgIQTmubfqeHBj8XGVeWPihaW3yGCDUWF2xhIAQlOOa098H2qA/3/KsdslTIwmBYFYjIGfrTiExknYGBXe3NtQJDoggbIEY57NdeVz+0s5M/c5tb2sWfCQhCASCYFx5XEKiw2SRUU9qbpcJBogAEAQCcedze4IxPflL/XVkyNz1oYN3QAgBIAi2kzW3kOi0oBBpaX2VepFvQDw4AkAQbF7WU7W+/t56Pz+/sTaemwgPjgCcjRxHcT3pTfcPkLyLi08w8QFoYhjRHxMz3tffm8TFzwkSWj0CcXmotAXpuJzyEkLIXzDOkKbctz3FAAAAAElFTkSuQmCC"; 
  }
  else {
  	img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAACXBIWXMAAAsSAAALEgHS3X78AAAELUlEQVRYhWP8//8/A6lARUFRgIGBwQCKBZC0X2BgYPhw58H9AyQbysDAwEKsQhUFRQURQaE6BgYGdwYGBilDbd0fCrJyHNISUnA1p86fZXjw9PEvFQVFNmkJyVNPXzyffufB/QXE2kEwZECOkJGUmvHk+TP3QA9vBhcbBwYXG3u8ep6+eM6w58gBhjXbNv99+OTRH04OzsYzly60U+QYQ23djs9fv5THhUQw5CakMvDx8BIyDwOcunCWoXlS799379+9fPP+nfedB/cvkOQYUJoQExHdIsDHb9FV1cCsqaJGsiPQweQFsxmmLJjNICIknH3i3JlpRDkG5BBBfoFLqgpKslNbu8kKDVwAFErplcV/uTg587A5iAldgI+X97yDpbXs4okzqOoQEDAzMGZYNnkW87fv3ydZGJlkocujhIy9hdVSbi7u8KWTZjJT2yHIABRCaRWFv7//+GGGnIbgIaOioOjw/uPH8BltvTR1CAM0hJIjYlkF+QU2IYvDHSPIL7CoIDmdWVpCkqYOgQFQ7uRgZ5dGji6wY1QUFBPYWFkl40Mi6eIQGOiqamD69ftXG4pjJETFKgpSMokujakFQNHFyc7BraKgGAB2DCgrv3j9Sp1QqUorkBwRwyItIVkJC5kAY12DP7TMPfgAqHp58+6tPtgx0hKSrpbGpnSPIhgAZRgmJmZmFQVFA6afv37pU6O4pwRoqaqDdAswcXNy8fDx8AyoY+SkpUExY4BRHQwEgLaJBAaFYz59+QymmX7++vljoB1z4/YtEHWAiYWF5cH1O7cG1DGgpiqIZvry9evBk+fPDZhDQFH06s1rNlAjnunDp4/bj587/XegHLPnyEFQdXQTxGYCtSeYmZg+gQQHAqzfvoXhx8+fCxlgFSUzM3P3wtXL6e4UUC/i0o2rvz58+jgd7hgQ5+L1Kz9BLTB6gtbJfQw8XNxL7zy4/wHuGBAH1Lcpa2v4B8vztAagZHHk9PGfb96/K4JZBS/0QJ2s33/+XG+b0kdzh4A8XNZW/09YUDgZFioM6L2DN+/e+mzbt/vnuh1baOqQ6Lz0v9xc3FsPnTy2FFkOxTF3Htx/8PPXL4vG/s5ftHAQzCEfPn3cduzMKT90eVw9SgN2NrYTXk6u7FU5RVTpP4FK+cyq4n9///3bis0hDNg6cQyQELrw89cvicOnTlz1S4r6R0kuA4UGqGsbkBLD8P3HjxpcDmEgZhQC1JX4/OVzn466FnOItx9LkIcPUY4AlSGgqJ6/auk/Tg7O62/evY3B1+knyjEgAGq0iwgJR/39+7fix88fElbG5qyaqmoMoBYicsPsyYvn4Og4dubkrzsP7rPJSErtfPL8WQexg0ckj1yBxmsYGBgclOQULN5//GDBxcnJw8LMwvL1+7cvTExMH5gYGc+8eP1qA8mjVwwMDABiAsbalsQujwAAAABJRU5ErkJggg==";   
  }
}

window.addEventListener('onWidgetLoad', function (obj) {
    const fieldData = obj.detail.fieldData;
    animationIn = fieldData.animationIn;
    animationOut = fieldData.animationOut;
    hideAfter = fieldData.hideAfter;
    messagesLimit = fieldData.messagesLimit;
    nickColor = fieldData.nickColor;
    customNickColor = fieldData.customNickColor;
    hideCommands = fieldData.hideCommands;
    channelName = obj.detail.channel.username;
    fetch('https://api.streamelements.com/kappa/v2/channels/' + obj.detail.channel.id + '/').then(response => response.json()).then((profile) => {
        provider = profile.provider;
    });
    if (fieldData.alignMessages === "block") {
        addition = "prepend";
        removeSelector = ".message-row:nth-child(n+" + (messagesLimit + 1) + ")"
    } else {
        addition = "append";
        removeSelector = ".message-row:nth-last-child(n+" + (messagesLimit + 1) + ")"
    }

    ignoredUsers = fieldData.ignoredUsers.toLowerCase().replace(" ", "").split(",");
});


function attachEmotes(message) {
    let text = html_encode(message.text);
    let data = message.emotes;
    if (typeof message.attachment !== "undefined") {
        if (typeof message.attachment.media !== "undefined") {
            if (typeof message.attachment.media.image !== "undefined") {
                text = `${message.text}<img src="${message.attachment.media.image.src}">`;
            }
        }
    }
    return text
        .replace(
            /([^\s]*)/gi,
            function (m, key) {
                let result = data.filter(emote => {
                    return html_encode(emote.name) === key
                });
                if (typeof result[0] !== "undefined") {
                    let url = result[0]['urls'][1];
                    if (provider === "twitch") {
                        return `<img class="emote" " src="${url}"/>`;
                    } else {
                        if (typeof result[0].coords === "undefined") {
                            result[0].coords = { x: 0, y: 0 };
                        }
                        let x = parseInt(result[0].coords.x);
                        let y = parseInt(result[0].coords.y);

                        let width = "{emoteSize}px";
                        let height = "auto";

                        if (provider === "mixer") {
                            console.log(result[0]);
                            if (result[0].coords.width) {
                                width = `${result[0].coords.width}px`;
                            }
                            if (result[0].coords.height) {
                                height = `${result[0].coords.height}px`;
                            }
                        }
                        return `<div class="emote" style="width: ${width}; height:${height}; display: inline-block; background-image: url(${url}); background-position: -${x}px -${y}px;"></div>`;
                    }
                } else return key;

            }
        );
}

function html_encode(e) {
    return e.replace(/[<>"^]/g, function (e) {
        return "&#" + e.charCodeAt(0) + ";";
    });
}

function addMessage(username, badges, message, isAction, uid, msgId) {
    totalMessages += 1;
    let actionClass = "";
    if (isAction) {
        actionClass = "action";
    }
    const element = $.parseHTML(`
    <div data-sender="${uid}" data-msgid="${msgId}" class="message-row {animationIn} animated" id="msg-${totalMessages}">
        <div class="user-box ${actionClass}">${badges}${username}</div>
        <div class="user-message ${actionClass}"><div class="user-msg-text">${message}</div></div>
    </div>`);
    if (addition === "append") {
        if (hideAfter !== 999) {
            $(element).appendTo('.main-container').delay(hideAfter * 1000).queue(function () {
                $(this).removeClass(animationIn).addClass(animationOut).delay(1000).queue(function () {
                    $(this).remove()
                }).dequeue();
            });
        } else {
            $(element).appendTo('.main-container');
        }
    } else {
        if (hideAfter !== 999) {
            $(element).prependTo('.main-container').delay(hideAfter * 1000).queue(function () {
                $(this).removeClass(animationIn).addClass(animationOut).delay(1000).queue(function () {
                    $(this).remove()
                }).dequeue();
            });
        } else {
            $(element).prependTo('.main-container');
        }
    }

    if (totalMessages > messagesLimit) {
        removeRow();
    }
}

function removeRow() {
    if (!$(removeSelector).length) {
        return;
    }
    if (animationOut !== "none" || !$(removeSelector).hasClass(animationOut)) {
        if (hideAfter !== 999) {
            $(removeSelector).dequeue();
        } else {
            $(removeSelector).addClass(animationOut).delay(1000).queue(function () {
                $(this).remove().dequeue()
            });

        }
        return;
    }

    $(removeSelector).animate({
        height: 0,
        opacity: 0
    }, 'slow', function () {
        $(removeSelector).remove();
    });
}