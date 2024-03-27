import requests
import sys

def get_movie_characters(movie_id):
    url = f"https://swapi.dev/api/films/{movie_id}/"
    response = requests.get(url)
    if response.status_code == 200:
        movie_data = response.json()
        characters_urls = movie_data['characters']
        characters_names = []
        for char_url in characters_urls:
            char_data = requests.get(char_url).json()
            characters_names.append(char_data['name'])
        return characters_names
    else:
        print("Failed to retrieve movie data. Please check your input.")
        return None

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python script.py <movie_id>")
        sys.exit(1)
    
    movie_id = sys.argv[1]
    characters = get_movie_characters(movie_id)
    if characters:
        for character in characters:
            print(character)

