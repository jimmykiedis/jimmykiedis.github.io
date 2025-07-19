import os
import json

# Caminho completo ou resolvido dinamicamente
BASE_DIR = os.path.dirname(__file__)  # Pasta onde o .py está
IMAGEM_DIR = os.path.join(BASE_DIR, "..", "img")

EXTENSOES_VALIDAS = (".png", ".jpg", ".jpeg", ".webp", ".heic")

# Pega todos os arquivos válidos
imagens = sorted([
    f"contents/img/{arquivo}"
    for arquivo in os.listdir(IMAGEM_DIR)
    if arquivo.lower().endswith(EXTENSOES_VALIDAS)
])

# Salva no JSON na mesma pasta do script
json_path = os.path.join(BASE_DIR, "lista.json")
with open(json_path, "w", encoding="utf-8") as f:
    json.dump(imagens, f, ensure_ascii=False, indent=4)

print("✅ Lista gerada com sucesso!")
