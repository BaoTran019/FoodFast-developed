import React, { useState, useEffect, useContext } from "react";
import { Container, Table, Badge, Button, Modal, Form } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { fetchAllDrones, assignDroneToOrder, unActiveDrone, activeDrone } from "../../js/drone-admin";
import OrderDetail from "../components/OrderItem/OrderDetail";
import { OrdersContext } from "../contexts/OrdersContext";

// Icon drone
const droneIcon = new L.Icon({
  iconUrl: "/drone.png", // file trong public
  iconSize: [35, 35],
});

const DroneManagement = () => {
  const [drones, setDrones] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editDrone, setEditDrone] = useState(null);
  const [orderIdAssign, setOrderIdAssign] = useState(""); // orderId để gán drone
  const [showOrder, setShowOrder] = useState(false)

  const { orders } = useContext(OrdersContext)
  const [order, setOrder] = useState([])

  // Lấy toàn bộ drone từ Firebase khi mount
  useEffect(() => {
    fetchAllDrones().then((data) => setDrones(data));
  }, []);

  const handleGetOrder = (orderId) => {
    const temp_order = orders.filter((order) => order.id === orderId);
    setOrder(temp_order[0] || null); // nếu không tìm thấy order, set null
  }


  // Chọn màu badge theo status
  const statusVariant = (status) => {
    switch (status) {
      case "idle":
        return "secondary";
      case "delivering":
        return "success";
      case "charging":
        return "warning";
      case "unactive":       // thêm case này
        return "dark";
      default:
        return "light";
    }
  };

  const handleUnActiveDrone = async (droneId) => {
    unActiveDrone(droneId)
    setDrones(prev =>
      prev.map(d => d.id === droneId ? { ...d, status: 'unactive' } : d)
    );

  }
  const handleActiveDrone = async (droneId) => {
    activeDrone(droneId)
    setDrones(prev =>
      prev.map(d => d.id === droneId ? { ...d, status: 'idle' } : d)
    );

  }

  // Mở modal chỉnh sửa drone
  const handleEditDrone = (drone) => {
    setEditDrone(drone);
    setShowModal(true);
  };

  // Thêm drone mới
  const handleAddDrone = () => {
    setEditDrone({ name: "", status: "idle", lat: 10.7769, lng: 106.7009 });
    setShowModal(true);
  };

  // Lưu drone (update local state, nếu muốn update Firestore thì thêm API gọi updateDoc)
  const handleSaveDrone = () => {
    if (!editDrone.name || !editDrone.status || !editDrone.lat || !editDrone.lng) return;

    setDrones((prev) => {
      if (editDrone.id) {
        return prev.map((d) => (d.id === editDrone.id ? editDrone : d));
      } else {
        const newId = prev.length ? Math.max(...prev.map((d) => d.id)) + 1 : 1;
        return [...prev, { ...editDrone, id: newId }];
      }
    });

    setShowModal(false);
    setEditDrone(null);
  };

  // Gán drone cho order
  const handleAssignDrone = async (droneId) => {
    if (!orderIdAssign) return alert("Nhập orderId để gán drone");
    await assignDroneToOrder(droneId, orderIdAssign);
    // reload lại drone list
    const updatedDrones = await fetchAllDrones();
    setDrones(updatedDrones);
    setOrderIdAssign("");
  };

  return (
    <Container style={{ paddingTop: "2rem" }}>
      <h2>Drone Management - TP. HCM</h2>

      {/* Table */}
      <Table striped bordered hover responsive className="my-3">
        <thead>
          <tr>
            <th style={{ width: "20%" }}>ID</th>
            <th style={{ width: "15%" }}>Status</th>
            <th style={{ width: "15%" }}>Latitude</th>
            <th style={{ width: "15%" }}>Longitude</th>
            <th style={{ width: "35%" }}>Order</th>
          </tr>
        </thead>
        <tbody>
          {drones.map((d) => (
            <tr key={d.id}
              onClick={() => d.orderId && (handleGetOrder(d.orderId), setShowOrder(true))}
              style={{ cursor: d.orderId ? 'pointer' : 'default' }}
            >
              <td>
                {d.id}{" "}
                {d.status === 'idle' ? (
                  <Button size="sm" variant="secondary" onClick={() => handleUnActiveDrone(d.id)} style={{marginLeft:'10px'}}>Unactive</Button>
                ) : d.status === 'unactive' ? (
                  <Button size="sm" variant="success" onClick={() => handleActiveDrone(d.id)} style={{marginLeft:'10px'}}>Active</Button>
                ) : null}

              </td>
              <td>
                <Badge bg={statusVariant(d.status)}>{d.status}</Badge>
              </td>
              <td>{d.lat}</td>
              <td>{d.lng}</td>
              <td>{d.orderId}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Map */}
      <MapContainer
        center={[10.7769, 106.7009]}
        zoom={13}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {drones.map((d) => (
          <Marker key={d.id} position={[d.lat, d.lng]} icon={droneIcon}>
            <Popup>
              <strong>{d.name}</strong>
              <br />
              Status: {d.status}
              <br />
              Lat: {d.lat}, Lng: {d.lng}
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {order && <OrderDetail show={showOrder} handleCloseModal={setShowOrder} order={order} />}

      {/* Modal thêm/chỉnh sửa */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editDrone?.id ? "Chỉnh sửa Drone" : "Thêm Drone Mới"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editDrone && (
            <Form>
              <Form.Group className="mb-2">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={editDrone.name}
                  onChange={(e) => setEditDrone({ ...editDrone, name: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={editDrone.status}
                  onChange={(e) => setEditDrone({ ...editDrone, status: e.target.value })}
                >
                  <option value="idle">Idle</option>
                  <option value="delivering">Delivering</option>
                  <option value="charging">Charging</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Latitude</Form.Label>
                <Form.Control
                  type="number"
                  value={editDrone.lat}
                  onChange={(e) => setEditDrone({ ...editDrone, lat: parseFloat(e.target.value) })}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Longitude</Form.Label>
                <Form.Control
                  type="number"
                  value={editDrone.lng}
                  onChange={(e) => setEditDrone({ ...editDrone, lng: parseFloat(e.target.value) })}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleSaveDrone}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default DroneManagement;
