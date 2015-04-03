# Scroll-Down Links
scrollElements = document.querySelectorAll ".scroll-down"

for el in scrollElements
  do (el) ->
    el.addEventListener "click", ->
      nextSectionId = el.getAttribute "data-next"
      nextSection = document.querySelector nextSectionId

      if nextSection
        App.Utils.scrollTo document.body, nextSection.offsetTop, 300

# Footer's Button
toTopButton = document.querySelector "#back-to-top"

toTopButton.addEventListener "click", ->
  App.Utils.scrollTo document.body, 0, 300