import os
from flask import Flask, request, jsonify, Blueprint
from werkzeug.utils import secure_filename

bp = Blueprint('upload', __name__)

# Configuración
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

@bp.route('/upload', methods=['POST'])
def upload_file():
    response = {
        'success': False,
        'error': '',
        'data': {}
    }

    try:
        # Verificar si se envió el archivo
        if 'file' not in request.files:
            raise ValueError('Debes enviar un archivo en el campo "file"')

        file = request.files['file']

        # Validar nombre de archivo
        if file.filename.strip() == '':
            raise ValueError('El nombre del archivo está vacío')

        filename = secure_filename(file.filename)

        # Validar extensión del archivo
        if '.' not in filename:
            raise ValueError('El archivo no tiene extensión')

        file_extension = filename.rsplit('.', 1)[1].lower()
        if file_extension not in ALLOWED_EXTENSIONS:
            allowed = ', '.join(sorted(ALLOWED_EXTENSIONS))
            raise ValueError(f'Extensión .{file_extension} no permitida')

        # Validar tamaño del archivo
        file.seek(0, os.SEEK_END)
        file_size = file.tell()
        file.seek(0)

        if file_size > MAX_FILE_SIZE:
            mb_size = file_size / (1024 * 1024)
            raise ValueError(f'Tamaño del archivo ({mb_size:.2f} MB) excede el límite de {MAX_FILE_SIZE//1024//1024} MB')

        response.update({
            'success': True,
            'data': {
                'filename': filename,
                'extension': file_extension,
                'size_bytes': file_size,
                'size_mb': round(file_size / (1024 * 1024), 2)
            }
        })

        return jsonify(response), 200  # OK

    except ValueError as ve:
        response['error'] = str(ve)
        return jsonify(response), 400  # Bad Request

    except Exception as e:
        response['error'] = f'Error en el servidor: {str(e)}'
        return jsonify(response), 500  # Internal Server Error