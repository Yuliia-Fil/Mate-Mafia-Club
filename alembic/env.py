import os
from logging.config import fileConfig

from sqlalchemy import engine_from_config, pool
from alembic import context

from dotenv import load_dotenv

# завантажуємо змінні з .env
load_dotenv()

# беремо конфіг alembic.ini
config = context.config

# якщо .ini пустий — перезаписуємо url з .env
DATABASE_URL = (
    f"postgresql://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}"
    f"@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"
)
config.set_main_option("sqlalchemy.url", DATABASE_URL)

# Логування
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# імпортуємо твої моделі
from app.database import Base  # Base = declarative_base()
import app.models  # щоб Alembic бачив усі таблиці

target_metadata = Base.metadata


def run_migrations_offline() -> None:
    """Міграції без підключення до БД."""
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    """Міграції з підключенням до БД."""
    connectable = engine_from_config(
        config.get_section(config.config_ini_section),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
