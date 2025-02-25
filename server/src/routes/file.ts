import { Router } from 'express';
import upload from '../config/multer';

const router = Router();

router.post('/profile/upload', upload.single('file'), (req, res) => {
  if (req.file) {
    res.status(200).json({ message: 'Arquivo de perfil enviado com sucesso!' });
  } else {
    res.status(400).json({ message: 'Falha no upload do arquivo de perfil. Verifique se o arquivo é uma imagem JPEG, JPG ou PNG.' });
  }
});

router.post('/tourist-place/upload', upload.array('files', 10), (req, res) => {
  if (req.files && Array.isArray(req.files) && req.files.length > 0) {
    res.status(200).json({ message: 'Imagens do local turístico enviadas com sucesso!' });
  } else {
    res.status(400).json({ message: 'Falha no upload das imagens do local turístico. Verifique se os arquivos são imagens JPEG, JPG ou PNG.' });
  }
});

export default router;
