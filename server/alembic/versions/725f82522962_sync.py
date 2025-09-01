"""Sync

Revision ID: 725f82522962
Revises: 661d398f5f20
Create Date: 2025-08-30 22:16:55.212697

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '725f82522962'
down_revision: Union[str, Sequence[str], None] = '661d398f5f20'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
