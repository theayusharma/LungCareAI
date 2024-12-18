# LungCare.AI  

**LungCare.AI** is an AI-powered platform that enables healthcare professionals to diagnose lung cancer by analyzing histopathological images of lung tissue.  

## Features  
- **AI-Driven Diagnosis**: Detect and classify cancerous cells accurately using advanced machine learning models.  
- **Image Upload Interface**: Easily upload lung tissue scans for instant analysis.  
- **Seamless Navigation**: A clean and intuitive UI tailored for healthcare professionals.  

## Core Pages  
1. **Home Page**: Introduction and overview of the platform.  
2. **Image Upload Page**: Upload histopathological images for AI-based analysis.  
3. **Diagnosis Page**: View AI-generated predictions and cell type classification.  

## Technologies Used  
### Frontend  
- **React**: Interactive user interface.  
- **Tailwind CSS**: Modern utility-first styling for a responsive UI.  

### Backend  
- **Node.js** and **Express.js**: RESTful API for image handling and model integration.  
- **MongoDB**: Database to store user uploads and results.  

### Machine Learning  
- **PyTorch**: Model training and inference.  
- **Google ViT (Vision Transformer)**: Pre-trained model for accurate image classification.  

## How It Works  
1. Upload a **histopathological image** of lung tissue.  
2. The image is sent to the backend, where the **Google ViT model** analyzes and classifies the presence of cancerous cells.  
3. Results are displayed on the **Diagnosis Page**.  

## Notes  
- Supports only **histopathological lung tissue images** for accurate results.  
