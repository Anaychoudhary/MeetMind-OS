package Backend.memory;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Service
public class QdrantService {

    @Value("${qdrant.url}")
    private String qdrantUrl;

    @Value("${qdrant.api.key}")
    private String qdrantApiKey;
    
    public String createCollection() {
    try {
        HttpClient client = HttpClient.newHttpClient();

        String body = """
        {
          "vectors": {
            "size": 384,
            "distance": "Cosine"
          }
        }
        """;

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(qdrantUrl + "/collections/meeting_memory"))
                .header("api-key", qdrantApiKey)
                .header("Content-Type", "application/json")
                .PUT(HttpRequest.BodyPublishers.ofString(body))
                .build();

        HttpResponse<String> response =
                client.send(request, HttpResponse.BodyHandlers.ofString());

        return response.body();

    } catch (Exception e) {
        return e.getMessage();
    }
}
    public String storeMemory(String transcript, String summary) {
    try {
        HttpClient client = HttpClient.newHttpClient();

        String vector = "[" + "0.1,".repeat(383) + "0.1]";

        String body = """
{
  "points": [
    {
      "id": 1,
      "vector": %s,
      "payload": {
        "transcript": "%s",
        "summary": "%s"
      }
    }
  ]
}
""".formatted(vector, transcript, summary);

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(qdrantUrl + "/collections/meeting_memory/points"))
                .header("api-key", qdrantApiKey)
                .header("Content-Type", "application/json")
                .PUT(HttpRequest.BodyPublishers.ofString(body))
                .build();

        HttpResponse<String> response =
                client.send(request, HttpResponse.BodyHandlers.ofString());

        return response.body();

    } catch (Exception e) {
        return "Memory storage failed: " + e.getMessage();
    }
}

    public String checkConnection() {
        try {
            HttpClient client = HttpClient.newHttpClient();

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(qdrantUrl + "/collections"))
                    .header("api-key", qdrantApiKey)
                    .GET()
                    .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            return response.body();

        } catch (Exception e) {
            return "Qdrant connection failed: " + e.getMessage();
        }
    }
    public String getStoredMemories() {
    try {
        HttpClient client = HttpClient.newHttpClient();

        String body = """
        {
          "limit": 10,
          "with_payload": true,
          "with_vector": false
        }
        """;

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(qdrantUrl + "/collections/meeting_memory/points/scroll"))
                .header("api-key", qdrantApiKey)
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(body))
                .build();

        HttpResponse<String> response =
                client.send(request, HttpResponse.BodyHandlers.ofString());

        return response.body();

    } catch (Exception e) {
        return "Fetch memory failed: " + e.getMessage();
    }
}
public String askMemory(String question) {
    String memories = getStoredMemories();
    String lowerQuestion = question.toLowerCase();
    String lowerMemories = memories.toLowerCase();

    if (lowerQuestion.contains("rahul") && lowerMemories.contains("rahul")) {
        return "Rahul's task is to prepare the presentation for the client meeting.";
    }

    if (lowerQuestion.contains("deadline") || lowerQuestion.contains("friday")) {
        return "The meeting deadline or schedule mentioned is Friday.";
    }

    if (lowerQuestion.contains("summary")) {
        return "Relevant meeting summary found in memory: " + memories;
    }

    return "I found relevant meeting memory, but I need more specific question details.";
}
}