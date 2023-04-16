'use strict'

const shipInPortModel = new ShipInPort() // eslint-disable-line no-undef

function initAddForm() {
  const form = window.document.querySelector('#shipInPort-add-form')
  form.addEventListener('submit', function (e) {
    e.preventDefault()

    const formData = new FormData(e.target)

    const shipInPortData = {}
    formData.forEach((value, key) => {
      shipInPortData[key] = value
    })
    const ships = shipInPortModel.SelectByKey('ships');
    const ports = shipInPortModel.SelectByKey('ports');
    if (
      parseInt(shipInPortData.portId) > 0 &&
      parseInt(shipInPortData.shipId) > 0 &&
      ships.some(e => e.number === shipInPortData.shipId) === true &&
      ports.some(e => e.erdpou === shipInPortData.portId) === true
    ) {
      shipInPortModel.Create(shipInPortData)
    }
    e.target.reset()
  })
}

function initDelete(row) {
  const formData = JSON.parse(row)

  // console.log(row)
  shipInPortModel.Delete(formData)
}

function initUpdateForm() {
  const form = window.document.querySelector('#shipInPort-update-form')
  form.addEventListener('submit', function (e) {
    e.preventDefault()

    const coll_ships = shipInPortModel.SelectByKey('ships')
    const coll_shipInPorts = shipInPortModel.SelectByKey('shipInPorts')

    const storeData = []

    coll_shipInPorts.forEach((el_shipInPorts) => {
      coll_ships.forEach((el_store) => {
        // console.log(el_shipInPorts.storeId, el_store.shopId)
        if (el_shipInPorts.shipId == el_store.number)
          storeData.push(el_shipInPorts)
      })
      // console.log('--------------')
    })

    shipInPortModel.Update(storeData)

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
  window.jQuery('#shipInPort-list').DataTable({
    data: shipInPortModel.Select(),
    columns: [
      { title: 'ShipId', data: 'shipId' },
      { title: 'PortId', data: 'portId' },
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
    'shipInPortsListDataChanged',
    function () {
      addEventToDeleteButtons()
    },
    false,
  )
}

function initListEvents() {
  document.addEventListener(
    'shipInPortsListDataChanged',
    function (e) {
      const dataTable = window.jQuery('#shipInPort-list').DataTable()

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
