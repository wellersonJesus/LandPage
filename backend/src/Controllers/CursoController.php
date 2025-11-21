<?php

class CursoController {

    private $db;

    public function __construct($pdo)
    {
        $this->db = $pdo;
    }

    /* ============================================================
        LISTAR TODOS OS CURSOS
    ============================================================ */
    public function getAllCursos()
    {
        $stmt = $this->db->query("SELECT * FROM Curso");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    }

    /* ============================================================
        BUSCAR CURSO POR ID
    ============================================================ */
    public function getCursoById($id)
    {
        $stmt = $this->db->prepare("SELECT * FROM Curso WHERE id = ?");
        $stmt->execute([$id]);

        $curso = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$curso) {
            http_response_code(404);
            echo json_encode(["error" => "Curso não encontrado"]);
            return;
        }

        echo json_encode($curso);
    }

    /* ============================================================
        CRIAR NOVO CURSO
    ============================================================ */
    public function createCurso($data)
    {
        $sql = "INSERT INTO Curso (nome, plataforma_id, carga_horaria, progresso)
                VALUES (?, ?, ?, ?)";

        $stmt = $this->db->prepare($sql);

        if (!$stmt->execute([
            $data["nome"],
            $data["plataforma_id"],
            $data["carga_horaria"],
            $data["progresso"]
        ])) {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao criar curso"]);
            return;
        }

        echo json_encode([
            "id" => $this->db->lastInsertId(),
            ...$data
        ]);
    }

    /* ============================================================
        ATUALIZAR CURSO
    ============================================================ */
    public function updateCurso($id, $data)
    {
        $sql = "UPDATE Curso 
                SET nome=?, plataforma_id=?, carga_horaria=?, progresso=?
                WHERE id=?";

        $stmt = $this->db->prepare($sql);

        if (!$stmt->execute([
            $data["nome"],
            $data["plataforma_id"],
            $data["carga_horaria"],
            $data["progresso"],
            $id
        ])) {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao atualizar curso"]);
            return;
        }

        if ($stmt->rowCount() === 0) {
            http_response_code(404);
            echo json_encode(["error" => "Curso não encontrado"]);
            return;
        }

        echo json_encode(["id" => $id, ...$data]);
    }

    /* ============================================================
        DELETAR CURSO
    ============================================================ */
    public function deleteCurso($id)
    {
        $stmt = $this->db->prepare("DELETE FROM Curso WHERE id = ?");
        $stmt->execute([$id]);

        if ($stmt->rowCount() === 0) {
            http_response_code(404);
            echo json_encode(["error" => "Curso não encontrado"]);
            return;
        }

        echo json_encode(["message" => "Curso deletado com sucesso"]);
    }
}
