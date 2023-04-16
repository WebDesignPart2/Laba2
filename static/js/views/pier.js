'use strict'

const pierModel = new Pier() // eslint-disable-line no-undef

function initAddForm() {
  const form = window.document.querySelector('#pier-add-form')
  form.addEventListener('submit', function (e) {
    e.preventDefault()

    const formData = new FormData(e.target)

    const pierData = {}
    formData.forEach((value, key) => {
      pierData[key] = value
    })
    if (pierData.number != '' &&
      pierData.capacity != '' &&
      pierData.port != '')
      pierModel.Create(pierData)

    e.target.reset()
  })
}

function initDelete(row) {
  const formData = JSON.parse(row)

  pierModel.Delete(formData)
}

function addEventToDeleteButtons() {
  const elems = document.querySelectorAll('#btn_delete')

  elems.forEach((pier) => {
    pier.addEventListener('click', function () {
      initDelete(pier.dataset.pier)
    })
  })
}

function initList() {
  window.jQuery('#pier-list').DataTable({
    data: pierModel.Select(),
    columns: [
      { title: 'PortNumber', data: 'port' },
      { title: 'Number', data: 'number' },
      { title: 'Capacity', data: 'capacity' },
      {
        data: null,
        title: 'Action',
        wrap: true,
        render: function (pier) {
          const def = JSON.stringify(pier)
          return `<div class="btn-group"> <button type="button"  id="btn_delete" class="btn_delete btn-warning " data-pier='${def}'>Delete</button></div>`
        },
      },
    ],
  })

  addEventToDeleteButtons()
}

function initButtonsEvent() {
  document.addEventListener(
    'piersListDataChanged',
    function () {
      addEventToDeleteButtons()
    },
    false,
  )
}

function initListEvents() {
  document.addEventListener(
    'piersListDataChanged',
    function (e) {
      const dataTable = window.jQuery('#pier-list').DataTable()

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
