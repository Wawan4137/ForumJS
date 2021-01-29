# ForumJS

## Créer une catégorie

`curl -X POST "http://localhost:8000/api/categories" -H  "accept: application/ld+json" -H  "Content-Type: application/ld+json" -H "Autorization: Bearer [JWT]" -d "{\"nom\":\"Nom\"}"`