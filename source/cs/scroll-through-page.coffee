scrollElements = document.querySelectorAll ".scroll-down"

for element in scrollElements
  ((el) ->
    el.addEventListener "click", ->
      nextSectionId = el.getAttribute "data-next"
      nextSection = document.querySelector nextSectionId

      if nextSection
        window.scrollTo 0, nextSection.offsetTop
  )(element)

toTopButton = document.querySelector "#back-to-top"

toTopButton.addEventListener "click", ->
  window.scrollTo(0, 0)