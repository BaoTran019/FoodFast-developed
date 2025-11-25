import { useContext, useState } from 'react'
import { Button } from 'react-bootstrap'
import { MenuContext } from '../../contexts/MenuContext'
import ItemModal from '../ItemModal/ItemModal'
import './ItemCard.css'

function ItemCard({ item, restaurantId }) {

    const { setStatus, deleteProduct } = useContext(MenuContext)

    const [show, setShow] = useState(false)

    const handleSetStatus = async () => {
        if (item.available === true) {
            const confirmStop = window.confirm("Bạn có chắc muốn ngừng bán sản phẩm này?");
            if (!confirmStop) return;
            await setStatus(restaurantId, item.id, false);
        }
        else if (item.available === false) setStatus(restaurantId, item.id, true)
    }

    const renderButton = () => {
        if (item.available === true)
            return <Button className='item-card-btn stop-selling-btn' onClick={() => handleSetStatus()}>Ngừng bán</Button>
        else return <Button className='item-card-btn sale-btn' onClick={() => handleSetStatus()}>Đưa vào bán</Button>
    }

    return (
        <div className={`item-card ${item.available === true ? "on-sale" : "off-sale"}`}>
            <img src={item.imageUrl}></img>
            <div>
                <h5>{item.name}</h5>
                {
                    item.available === true
                        ? <span style={{ color: 'rgb(22, 163, 74)' }}>Đang bán</span>
                        : <span style={{ color: 'rgb(220, 38, 38)' }}>Ngưng bán</span>
                }
                <p style={{ fontSize: '1.2rem', color: 'grey' }}>
                    {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(item.price)}
                </p>
                <p style={{ fontSize: '0.8rem', color: 'grey' }}>{item.description}</p>
                <div style={{ display: 'flex', gap: '5%' }}>
                    {renderButton()}
                    <Button className='item-card-btn' onClick={() => setShow(true)}>Chỉnh sửa</Button>
                    {/*<Button className='item-card-btn delete-btn' onClick={() => handleDelete()}>Xóa</Button>*/}
                </div>

            </div>

            <ItemModal show={show} handleCloseModal={setShow} item={item} />

        </div>


    )
}

export default ItemCard
