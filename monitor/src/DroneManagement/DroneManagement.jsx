import React, { useState, useEffect } from "react";
import { Container, Table, Badge, Button, Modal, Form } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { fetchAllDrones, assignDroneToOrder } from "../../js/drone-admin";

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

  // Lấy toàn bộ drone từ Firebase khi mount
  useEffect(() => {
    fetchAllDrones().then((data) => setDrones(data));
  }, []);

  // Chọn màu badge theo status
  const statusVariant = (status) => {
    switch (status) {
      case "idle":
        return "secondary";
      case "delivering":
        return "success";
      case "charging":
        return "warning";
      default:
        return "light";
    }
  };

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
      <Button className="my-3" onClick={handleAddDrone}>
        Thêm Drone Mới
      </Button>

      {/* Input orderId gán */}
      <Form.Group className="mb-3" style={{ maxWidth: "300px" }}>
        <Form.Label>Order ID để gán drone</Form.Label>
        <Form.Control
          type="text"
          value={orderIdAssign}
          onChange={(e) => setOrderIdAssign(e.target.value)}
        />
      </Form.Group>

      {/* Table */}
      <Table striped bordered hover responsive className="my-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {drones.map((d) => (
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{d.name}</td>
              <td>
                <Badge bg={statusVariant(d.status)}>{d.status}</Badge>
              </td>
              <td>{d.lat}</td>
              <td>{d.lng}</td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  className="me-1"
                  onClick={() => handleEditDrone(d)}
                >
                  Edit
                </Button>
                {d.status === "idle" && (
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleAssignDrone(d.id)}
                  >
                    Gán Order
                  </Button>
                )}
              </td>
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
