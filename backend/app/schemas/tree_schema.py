from typing import List, Optional
from pydantic import BaseModel


class TreeNode(BaseModel):
    name: str
    data: Optional[str] = None
    children: Optional[List["TreeNode"]] = None


TreeNode.model_rebuild()


class TreeCreate(BaseModel):
    tree: TreeNode


class TreeResponse(BaseModel):
    id: int
    tree_data: dict

    class Config:
        from_attributes = True