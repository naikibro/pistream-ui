# Pi stream UI

This is a **React-based frontend** for the Pistream Dashboard, allowing users to start and stop image capture via an Express backend. It periodically updates the displayed image and provides real-time status updates using **React, Material-UI, Axios, and React Hot Toast**.

## 🚀 Features

- Start and stop image capture
- Display the latest captured image
- Automatic status polling every 3 seconds
- React Hot Toast for real-time notifications
- API connectivity detection with UI updates

## 📦 Tech Stack

- **React (Vite)** - Fast frontend development
- **Material-UI (MUI)** - UI components
- **Axios** - API communication
- **React Hot Toast** - User notifications

---

## 📂 Project Setup

### 1️⃣ Install dependencies

```bash
npm install
```

### 2️⃣ Create a `.env` file

Add your backend API URL in a `.env` file at the root of the project:

```env
VITE_BASE_URL=http://localhost:3000
```

### 3️⃣ Start the frontend

```bash
npm run dev
```

This will launch the frontend on `http://localhost:5173/` (default Vite port).

---

## 🔄 API Integration

The frontend communicates with the Express backend through the following API routes:

| Method | Endpoint  | Description            |
| ------ | --------- | ---------------------- |
| `GET`  | `/status` | Get capture status     |
| `POST` | `/start`  | Start image capture    |
| `POST` | `/stop`   | Stop image capture     |
| `GET`  | `/image`  | Fetch the latest image |

---

## 🖥️ Usage

1️⃣ **Start the backend** (Ensure Express API is running on `VITE_BASE_URL` before launching the frontend).  
2️⃣ **Launch the frontend** (`npm run dev`).  
3️⃣ Click **Start Capture** to begin image capture.  
4️⃣ Click **Stop Capture** to stop it.  
5️⃣ If the backend is turned off, the UI will disable the buttons and notify the user.  
6️⃣ If the backend comes back online, the UI will automatically re-enable the buttons and show a toast notification.

---

## 🎯 Known Issues & Fixes

- If the status doesn't update when API goes offline, ensure the `.env` file is correctly configured.
- If images do not refresh, try **hard refreshing (`Ctrl+Shift+R` / `Cmd+Shift+R`)** or restarting the backend.

---

## ✨ Contributions

Feel free to contribute! Open an issue or submit a pull request. 🎉

---

## 📜 License

MIT License. Free to use and modify.

---

### 🔗 Author

Developed by **Naiki Brotherson** (Pacific Knowledge). 🌊
