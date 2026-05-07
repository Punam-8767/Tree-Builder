from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.schemas.tree_schema import TreeCreate
from app.services.tree_service import (
    create_tree,
    get_all_trees,
    update_tree
)


router = APIRouter(
    prefix="/api/trees",
    tags=["Trees"]
)


# @router.post("/")
# def create_tree_api(
#     payload: TreeCreate,
#     db: Session = Depends(get_db)
# ):
#     tree = create_tree(
#         db=db,
#         tree_data=payload.tree.model_dump()
#     )

#     return {
#         "success": True,
#         "message": "Tree created successfully",
#         "data": {
#             "id": tree.id,
#             "tree_data": tree.tree_data
#         }
#     }


@router.post("/")
def create_tree_api(
    payload: TreeCreate,
    db: Session = Depends(get_db)
):
    print("🚀 AI Monk Backend is Running")

    tree = create_tree(
        db=db,
        tree_data=payload.tree.model_dump()
    )

    print("✅ Tree Created Successfully")

    return {
        "success": True,
        "message": "Tree created successfully",
        "data": {
            "id": tree.id,
            "tree_data": tree.tree_data
        }
    }

@router.get("/")
def get_trees_api(
    db: Session = Depends(get_db)
):
    trees = get_all_trees(db)

    return {
        "success": True,
        "count": len(trees),
        "data": [
            {
                "id": tree.id,
                "tree_data": tree.tree_data
            }
            for tree in trees
        ]
    }


@router.put("/{tree_id}")
def update_tree_api(
    tree_id: int,
    payload: TreeCreate,
    db: Session = Depends(get_db)
):
    updated_tree = update_tree(
        db=db,
        tree_id=tree_id,
        tree_data=payload.tree.model_dump()
    )

    if not updated_tree:
        raise HTTPException(
            status_code=404,
            detail="Tree not found"
        )

    return {
        "success": True,
        "message": "Tree updated successfully",
        "data": {
            "id": updated_tree.id,
            "tree_data": updated_tree.tree_data
        }
    }