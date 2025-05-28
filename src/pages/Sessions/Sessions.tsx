import { LayoutComponents } from "../../components/LayoutComponents/LayoutComponents";
import { api } from "../../services/api";

export const Sessions = () => {
    async function fetchSessions() {
        try {
            const response = await api.get("/players");
            console.log(response.data);
        } catch (error) {
            console.error("Erro ao buscar sessões:", error);
        }
    }
    fetchSessions();
    return (
        <LayoutComponents>

            <h1 className="text-white">Em desenvolvimento :)</h1>

        </LayoutComponents>
    );
}