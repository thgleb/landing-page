App.Utils = {}

App.Utils.scrollTo = (element, to, duration) ->
  if duration < 0
    return;

  difference = to - element.scrollTop
  perTick = difference / duration * 10

  setTimeout (->
    element.scrollTop = element.scrollTop + perTick

    if element.scrollTop == to
      return

    App.Utils.scrollTo(element, to, duration - 10)
  ), 10