'use strict'

const portModel = new Port() // eslint-disable-line no-undef

function initAddForm() {
  const form = window.document.querySelector('#port-add-form')
  form.addEventListener('submit', function (e) {
    e.preventDefault()

    const formData = new FormData(e.target)

    const portData = {}
    formData.forEach((value, key) => {
      portData[key] = value
    })

    if (portData.name != '' &&
      portData.address != '' &&
      portData.country != '' &&
      portData.erdpou != '')
      portModel.Create(portData)

    e.target.reset()
  })
}
function initDelete(row) {
  const formData = JSON.parse(row)

  portModel.Delete(formData)
}

function addEventToDeleteButtons() {
  const elems = document.querySelectorAll('#btn_delete')

  elems.forEach((item) => {
    item.addEventListener('click', function () {
      initDelete(item.dataset.item)
    })
  })
}

function initList() {
  window.jQuery('#port-list').DataTable({
    data: portModel.Select(),
    columns: [
      { title: 'Name', data: 'name' },
      { title: 'Country', data: 'country' },
      { title: 'Erdpou', data: 'erdpou' },
      { title: 'Address', data: 'address' },
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
    'portsListDataChanged',
    function () {
      addEventToDeleteButtons()
    },
    false,
  )
}

function initListEvents() {
  document.addEventListener(
    'portsListDataChanged',
    function (e) {
      const dataTable = window.jQuery('#port-list').DataTable()

      dataTable.clear()
      dataTable.rows.add(e.detail)
      dataTable.draw()
    },
    false,
  )
}

window.addEventListener('DOMContentLoaded', (e) => {
  initAddForm()
  initList()
  initListEvents()
  initButtonsEvent()
})
