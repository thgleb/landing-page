switcher = document.querySelector "#header-nav-switcher"
navigation = document.querySelector "#header-nav nav"

switcher.addEventListener "click", (event) ->
  state = switcher.getAttribute "data-state"
  newState = if state == "on" then "off" else "on"

  switcher.setAttribute "data-state", newState
  navigation.setAttribute "data-state", newState

  navigation.style.opacity = opacity
