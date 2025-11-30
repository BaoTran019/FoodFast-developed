import React, { useState } from "react";
import { Container, Table, Badge, Button, Modal, Form } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Dữ liệu giả lập
const initialDrones = [
  { id: 1, name: "Drone A", status: "idle", lat: 10.7769, lng: 106.7009 },
  { id: 2, name: "Drone B", status: "delivering", lat: 10.7790, lng: 106.6950 },
  { id: 3, name: "Drone C", status: "charging", lat: 10.7629, lng: 106.6827 },
  { id: 4, name: "Drone D", status: "idle", lat: 10.7535, lng: 106.6675 },
  { id: 5, name: "Drone E", status: "delivering", lat: 10.7542, lng: 106.6660 },
];

// Icon drone
const droneIcon = new L.Icon({
  iconUrl: "../../public/drone.png",
  iconSize: [35, 35],
});

const DroneManagement = () => {
  const [drones, setDrones] = useState(initialDrones);

  const [showModal, setShowModal] = useState(false);
  const [editDrone, setEditDrone] = useState(null);

  // Hàm chọn màu badge theo status
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

  // Thêm / chỉnh sửa drone
  const handleSaveDrone = () => {
    if (!editDrone.name || !editDrone.status || !editDrone.lat || !editDrone.lng) return;

    setDrones((prev) => {
      if (editDrone.id) {
        // Update drone
        return prev.map((d) => (d.id === editDrone.id ? editDrone : d));
      } else {
        // Add new drone
        const newId = prev.length ? Math.max(...prev.map((d) => d.id)) + 1 : 1;
        return [...prev, { ...editDrone, id: newId }];
      }
    });
    setShowModal(false);
    setEditDrone(null);
  };

  // Mở modal chỉnh sửa
  const handleEditDrone = (drone) => {
    setEditDrone(drone);
    setShowModal(true);
  };

  // Thêm drone mới
  const handleAddDrone = () => {
    setEditDrone({ name: "", status: "idle", lat: 10.7769, lng: 106.7009 });
    setShowModal(true);
  };

  return (
    <Container style={{ paddingTop: "2rem" }}>
      <h2>Drone Management - TP. HCM (Quận 1, 3, 5)</h2>
      <Button className="my-3" onClick={handleAddDrone}>
        Thêm Drone Mới
      </Button>

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
