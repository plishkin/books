<?php

namespace App\Entity;

use App\Repository\BookRepository;
use DateTimeImmutable;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: BookRepository::class)]
class Book implements IRestful
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $title = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $publisher = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $author = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $genre = null;

    #[ORM\Column(nullable: true)]
    private ?DateTimeImmutable $published_at = null;

    #[ORM\Column(nullable: true)]
    private ?int $words_amount = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 2, nullable: true)]
    private ?string $price = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(?string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getPublisher(): ?string
    {
        return $this->publisher;
    }

    public function setPublisher(?string $publisher): self
    {
        $this->publisher = $publisher;

        return $this;
    }

    public function getAuthor(): ?string
    {
        return $this->author;
    }

    public function setAuthor(?string $author): self
    {
        $this->author = $author;

        return $this;
    }

    public function getGenre(): ?string
    {
        return $this->genre;
    }

    public function setGenre(?string $genre): self
    {
        $this->genre = $genre;

        return $this;
    }

    public function getPublishedAt(): ?DateTimeImmutable
    {
        return $this->published_at;
    }

    public function setPublishedAt(?DateTimeImmutable $published_at): self
    {
        $this->published_at = $published_at;

        return $this;
    }

    public function getWordsAmount(): ?int
    {
        return $this->words_amount;
    }

    public function setWordsAmount(?int $words_amount): self
    {
        $this->words_amount = $words_amount;

        return $this;
    }

    public function getPrice(): ?string
    {
        return $this->price;
    }

    public function setPrice(?string $price): self
    {
        $this->price = $price;

        return $this;
    }

    public function toRestfulArray(): array
    {
        return [
            'id' => $this->getId(),
            'title' => $this->getTitle(),
            'publisher' => $this->getPublisher(),
            'author' => $this->getAuthor(),
            'genre' => $this->getGenre(),
            'published_at' => $this->getPublishedAt()?->getTimestamp(),
            'words_amount' => $this->getWordsAmount(),
            'price' => $this->getPrice(),
        ];
    }

    public function fromRestfulArray(array $arr): static
    {
        if (array_key_exists('published_at', $arr)) {
            $this->setPublishedAt((new DateTimeImmutable())->setTimestamp($arr['published_at']));
        }
        return $this->setTitle($arr['title'] ?? $this->getTitle())
            ->setPublisher($arr['publisher'] ?? $this->getPublisher())
            ->setAuthor($arr['author'] ?? $this->getAuthor())
            ->setGenre($arr['genre'] ?? $this->getGenre())
            ->setWordsAmount($arr['words_amount'] ?? $this->getWordsAmount())
            ->setPrice($arr['price'] ?? $this->getPrice());
    }
}
