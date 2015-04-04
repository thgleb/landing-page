tweets = document.querySelectorAll("#tweets-box li")
navigation = document.querySelectorAll("#tweets-nav li")

attributeName = "data-state"
animationDuration = 300

clear = (cb) ->
  i = -1;

  for el, index in navigation

    if el.getAttribute(attributeName) == "on"
      i = index
      break;

  if i == -1
    return;

  tweets[i].classList.add "hide"
  navigation[i].removeAttribute attributeName

  setTimeout ->
    tweets[i].classList.remove "hide"
    tweets[i].removeAttribute attributeName
  , animationDuration

setActive = (i) ->
  tweets[i].setAttribute attributeName, "on"
  navigation[i].setAttribute attributeName, "on"

  tweets[i].classList.add "show"

  setTimeout ->
    tweets[i].classList.remove "show"
  , animationDuration

for el, i in navigation
  do (el, i) ->
    el.addEventListener "click", (event) ->
      if el.getAttribute(attributeName) == "on"
        return;

      do clear
      setActive i