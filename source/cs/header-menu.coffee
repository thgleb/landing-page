switcher = document.querySelector "#header-nav-switcher"
navigation = document.querySelector "#header-nav nav"
navElements = navigation.querySelectorAll "a"

# Open-Close Navigation Bar
switcher.addEventListener "click", (event) ->
  state = switcher.getAttribute "data-state"
  newState = if state == "on" then "off" else "on"

  switcher.setAttribute "data-state", newState
  navigation.setAttribute "data-state", newState

# Scroll to a Section
for element in navElements
  do (element) ->
    element.addEventListener "click", (event) ->
      sectionId = element.getAttribute "href"
      section = document.querySelector sectionId

      if section
        do event.preventDefault
        App.Utils.scrollTo document.body, section.offsetTop, 300