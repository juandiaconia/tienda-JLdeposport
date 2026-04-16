from pathlib import Path
from PIL import Image, UnidentifiedImageError

EXTENSIONS = {'.jpg', '.jpeg', '.png', '.webp'}
THRESHOLD = 300 * 1024
output = []
img_dir = Path('img')
for path in sorted(img_dir.rglob('*')):
    if path.suffix.lower() not in EXTENSIONS or not path.is_file():
        continue
    size_before = path.stat().st_size
    if size_before < THRESHOLD:
        continue
    try:
        with Image.open(path) as img:
            img_format = img.format
            if img_format == 'JPEG':
                save_kwargs = {'quality': 78, 'optimize': True, 'progressive': True}
            elif img_format == 'PNG':
                if img.mode not in ('RGB', 'RGBA'):
                    img = img.convert('RGBA')
                save_kwargs = {'optimize': True}
            elif img_format == 'WEBP':
                save_kwargs = {'quality': 80, 'method': 6}
            else:
                continue
            temp_path = path.with_suffix(path.suffix + '.tmp')
            img.save(temp_path, format=img_format, **save_kwargs)
            size_after = temp_path.stat().st_size
            if size_after < size_before:
                temp_path.replace(path)
                output.append((str(path), size_before, size_after))
            else:
                temp_path.unlink()
    except UnidentifiedImageError:
        continue
    except Exception as e:
        output.append((str(path), 'error', str(e)))

print('processed', len(output), 'files')
for entry in output:
    if isinstance(entry[1], int):
        path, before, after = entry
        print(path, f'{before/1024:.1f}KB -> {after/1024:.1f}KB')
    else:
        print(entry)
