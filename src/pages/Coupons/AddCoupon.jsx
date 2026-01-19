import React from 'react'
import Modal from '../../components/TableModal/Modal'

const AddCoupon = ({onClose}) => {
  return (
          <Modal onClose={onClose}>
            <div className="flex">
                <h1>add coupon</h1>
            </div>
            {/* Btn function */}
            <div className="flex justify-end gap-2">
              <button onClick={onClose} className="border px-4 py-2 rounded-lg">
                Cancel
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                Add
              </button>
            </div>
          </Modal>
  )
}

export default AddCoupon