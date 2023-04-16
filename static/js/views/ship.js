'use strict'

const shipModel = new Ship() // eslint-disable-line no-undef

function initAddForm() {
  const form = window.document.querySelector('#ship-add-form')
  form.addEventListener('submit', function (e) {
    e.preventDefault()

    const formData = new FormData(e.target)

    const shipData = {}
    formData.forEach((value, key) => {
      shipData[key] = value
    })


    if (shipData.name != '' &&
      shipData.number > 0 &&
      shipData.country != '' &&
      shipData.tannage != '')
      shipModel.Create(shipData);


    e.target.reset()
  })
}

function initDelete(row) {
  const formData = JSON.parse(row)

  shipModel.Delete(formData)
}

function initUpdateForm() {
  const form = window.document.querySelector('#ship-update-form')
  form.addEventListener('submit', function (e) {
    e.preventDefault()

    const coll_ships = shipModel.SelectByKey('ships')

    const shipData = []
    coll_ships.forEach((el_ship) => {
      coll_ships.forEach((el_shop) => {
        if (el_ship.shopId == el_shop.id)
          shipData.push(el_ship)
      })
    })

    shipModel.Update(shipData)

    e.target.reset()
  })
}

function addEventToDeleteButtons() {
  const elems = document.querySelectorAll('#btn_delete')

  elems.forEach((item) => {
    // console.log('assign: ', item)
    item.addEventListener('click', function () {
      // console.log('addEventListener here')
      initDelete(item.dataset.item)
    })
  })
}

function initList() {
  window.jQuery('#ship-list').DataTable({
    data: shipModel.Select(),
    columns: [
      { title: 'Number', data: 'number' },
      { title: 'Name', data: 'name' },
      { title: 'Country', data: 'country' },
      { title: 'Tannage', data: 'tannage' },
      {
        data: null,
        title: 'Action',
        wrap: true,
        render: function (item) {
          const def = JSON.stringify(item)
          return `<div class="btn-group"> <button type="button"  id="btn_delete" class="btn_delete btn-warning " data-item='${def}'>Delete</button></div>`
        },
      },
    ],
  })

  addEventToDeleteButtons()
}
function initButtonsEvent() {
  document.addEventListener(
    'shipsListDataChanged',
    function () {
      addEventToDeleteButtons()
    },
    false,
  )
}
function initListEvents() {
  document.addEventListener(
    'shipsListDataChanged',
    function (e) {
      const dataTable = window.jQuery('#ship-list').DataTable()

      dataTable.clear()
      dataTable.rows.add(e.detail)
      dataTable.draw()
    },
    false,
  )
}

window.addEventListener('DOMContentLoaded', (e) => {
  initAddForm()
  initUpdateForm()
  initList()
  initListEvents()
  initButtonsEvent()
})
